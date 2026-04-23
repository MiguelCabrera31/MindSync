import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './universities.component.html',
  styleUrl: './universities.component.scss'
})
export class UniversitiesComponent implements AfterViewInit {

  form = { name: '', role: '', institution: '', email: '', size: '', timeframe: '' };

  kpis = [
    { num: '43.8%', label: 'Con diagnóstico de ansiedad', sub: 'Afecta rendimiento académico directamente', icon: '🧠', color: '#4A6FA5' },
    { num: '60.2%', label: 'Carga académica excesiva', sub: 'Predictor directo de deserción universitaria', icon: '📚', color: '#A07840' },
    { num: '15 sem.', label: 'Espera promedio', sub: 'Para acceder a atención psicológica pública', icon: '⏳', color: '#A05060' },
  ];

  costs = [
    'Deserción estudiantil por crisis no atendidas a tiempo',
    'Riesgo reputacional ante incidentes graves no gestionados',
    'Saturación del equipo de bienestar existente',
    'Presión normativa creciente (Defensoría del Pueblo)',
    'Pérdida de posicionamiento en rankings de bienestar',
  ];

  steps = [
    { num: '1', title: 'Depósito inicial', desc: 'Tu institución contrata MindSync con una tarifa anual por volumen de estudiantes. Incluye acceso completo y el depósito de riesgo.', color: 'var(--forest)' },
    { num: '2', title: 'Medición anónima', desc: 'La plataforma calcula la "Huella de Estrés" institucional de forma agregada y 100% anónima. Nunca se accede a conversaciones individuales.', color: 'var(--teal)' },
    { num: '3', title: 'Reembolso por resultados', desc: 'Si la Huella de Estrés baja un 15%, te reembolsamos el 20% de la tarifa. Si sube, retenemos el balance para intervenciones de crisis activas.', color: 'var(--gold)' },
  ];

  features = [
    { icon: '🔒', title: 'Privacidad total por diseño', desc: 'La IA procesa todo localmente. Ni tu institución ni MindSync pueden acceder a conversaciones individuales.', bg: 'var(--forest-l)', color: 'var(--forest)' },
    { icon: '📊', title: 'Dashboard institucional anónimo', desc: 'Métricas agregadas de bienestar estudiantil, tendencias de estrés y alertas colectivas. Sin exponer a nadie.', bg: 'var(--slate-l)', color: 'var(--slate)' },
    { icon: '🩺', title: 'Derivación automática', desc: 'Cuando la IA detecta señales de riesgo alto, escala al equipo de psicólogos de tu institución.', bg: 'var(--gold-l)', color: 'var(--gold)' },
    { icon: '🔌', title: 'Integración simple', desc: 'API REST. Se integra con tu portal de bienestar existente en menos de 2 semanas.', bg: '#F3E8FF', color: '#9333EA' },
    { icon: '❤️', title: 'Biofeedback predictivo', desc: 'Integración con wearables para detectar crisis antes de que el estudiante pida ayuda.', bg: 'var(--rose-sl)', color: 'var(--rose-s)' },
    { icon: '🛡️', title: 'Sin riesgo legal', desc: 'Al no almacenar conversaciones, eliminas el riesgo de brechas de datos con información sensible de salud.', bg: 'var(--sage-l)', color: 'var(--sage-d)' },
  ];

  compRows = [
    { feat: 'Privacidad local (sin nube)', ms: '✓ Sí', w: '✗ No', h: '✗ No' },
    { feat: 'Modelo por resultados',       ms: '✓ Depósito', w: 'Pago fijo', h: 'Pago fijo' },
    { feat: 'Dashboard anónimo',           ms: '✓ Incluido', w: 'Limitado', h: 'No' },
    { feat: 'Funciona offline',            ms: '✓ Siempre', w: '✗ No', h: '✗ No' },
    { feat: 'Derivación automática',       ms: '✓ Integrada', w: 'Manual', h: 'No' },
    { feat: 'Costo',                       ms: 'Por estudiante activo', w: 'Alto (EE.UU.)', h: 'Muy alto' },
  ];

  sizeOptions = ['Menos de 5,000', '5,000 – 15,000', '15,000 – 40,000', 'Más de 40,000'];
  timeOptions = ['Esta semana', 'La próxima semana', 'En las próximas 2 semanas'];

  ngAfterViewInit() {
    const showAll = () => document.querySelectorAll('.sr').forEach(el => el.classList.add('on'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
      }, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.sr').forEach(el => io.observe(el));
      setTimeout(showAll, 2000);
    } else { showAll(); }
  }

  submitForm() {
    if (this.form.name && this.form.email && this.form.institution) {
      alert(`¡Gracias, ${this.form.name}! Nos pondremos en contacto con ${this.form.email} en menos de 24 horas para coordinar el demo. 🎉`);
      this.form = { name: '', role: '', institution: '', email: '', size: '', timeframe: '' };
    }
  }
}
