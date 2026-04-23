import { Component, AfterViewChecked, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('msgContainer') private msgContainer!: ElementRef;

  inputText = '';
  showCrisisAlert = signal(false);

  constructor(public chatService: ChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    const text = this.inputText.trim();
    if (!text || this.chatService.isLoading()) return;
    this.inputText = '';

    this.chatService.sendMessage(text).subscribe({
      next: (res) => {
        this.chatService.addAssistantMessage(res.message);
        this.chatService.riskLevel.set(res.risk_level);
        if (res.suggest_professional) {
          this.showCrisisAlert.set(true);
        }
      },
      error: () => {
        this.chatService.addAssistantMessage('Hubo un problema de conexión. Recuerda que para crisis inmediatas, la Línea 106 está disponible 24/7.');
      }
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.chatService.clearChat();
    this.showCrisisAlert.set(false);
  }

  private scrollToBottom() {
    try {
      this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
