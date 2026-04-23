import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  risk_level: 'low' | 'medium' | 'high';
  suggest_professional: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8000/api';

  messages = signal<Message[]>([]);
  isLoading = signal(false);
  riskLevel = signal<'low' | 'medium' | 'high'>('low');

  constructor(private http: HttpClient) {
    // Welcome message
    this.messages.set([{
      id: '0',
      role: 'assistant',
      content: 'Hola 👋 No hay prisa. ¿Qué está pasando hoy?',
      timestamp: new Date()
    }]);
  }

  sendMessage(text: string): Observable<ChatResponse> {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    this.messages.update(msgs => [...msgs, userMsg]);
    this.isLoading.set(true);

    // Try real API, fallback to mock
    return this.getMockResponse(text);
  }

  addAssistantMessage(content: string) {
    const msg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date()
    };
    this.messages.update(msgs => [...msgs, msg]);
    this.isLoading.set(false);
  }

  clearChat() {
    this.messages.set([{
      id: '0',
      role: 'assistant',
      content: 'Hola 👋 No hay prisa. ¿Qué está pasando hoy?',
      timestamp: new Date()
    }]);
    this.riskLevel.set('low');
  }

  private getMockResponse(input: string): Observable<ChatResponse> {
    const lower = input.toLowerCase();
    let response = '';
    let risk: 'low' | 'medium' | 'high' = 'low';

    if (lower.includes('suicid') || lower.includes('quitarme la vida') || lower.includes('no quiero vivir')) {
      risk = 'high';
      response = 'Gracias por confiar en mí con algo tan serio. Lo que sientes importa mucho. Necesito pedirte que contactes a un profesional ahora — no mañana, ahora. ¿Puedo ayudarte a encontrar una línea de crisis?';
    } else if (lower.includes('ansied') || lower.includes('pánico') || lower.includes('no puedo respirar')) {
      risk = 'medium';
      response = 'Eso suena muy intenso. La ansiedad puede sentirse abrumadora, pero hay algo importante: estás aquí, en este momento. ¿Cuándo fue la última vez que te sentiste en paz, aunque sea por un momento?';
    } else if (lower.includes('mal') || lower.includes('triste') || lower.includes('cansad')) {
      risk = 'low';
      response = 'Entiendo. "Mal" puede significar muchas cosas. No quiero asumir — cuéntame más. ¿Es algo específico que pasó, o es una sensación que llevas tiempo cargando?';
    } else if (lower.includes('parcial') || lower.includes('entreg') || lower.includes('examen')) {
      risk = 'low';
      response = 'La presión académica es real y muchas veces se siente interminable. Pero antes de hablar de estrategias, necesito preguntarte algo: ¿estás durmiendo?';
    } else if (lower.includes('hola') || lower.includes('buenas') || lower.includes('hey')) {
      risk = 'low';
      response = '¿Cómo estás hoy, de verdad? No la respuesta automática — ¿qué está pasando realmente?';
    } else {
      risk = 'low';
      const responses = [
        'Eso que dices me parece importante. ¿Puedes contarme un poco más sobre eso?',
        'Entiendo. ¿Y cómo te hace sentir eso cuando lo piensas?',
        'Interesante. A veces decir las cosas en voz alta (o escribirlas) ya ayuda. ¿Qué más está pasando?',
        'No quiero saltarme nada. ¿Hace cuánto tiempo sientes esto?'
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    return of({ message: response, risk_level: risk, suggest_professional: risk === 'high' }).pipe(delay(1200));
  }
}
