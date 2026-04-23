import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  stats = [
    { num: '43.8%', label: 'Con diagnóstico de ansiedad', desc: 'De universitarios con síntomas que afectan su rendimiento académico.', color: 'blue', icon: '🧠' },
    { num: '60.2%', label: 'Carga académica excesiva', desc: 'Siente que la presión de los estudios supera sus capacidades de manejo.', color: 'amber', icon: '🔥' },
    { num: '85%',   label: 'Prefiere hablar con IA', desc: 'Se siente más cómodo contándole sus problemas a una IA que a un amigo.', color: 'sage', icon: '💬' }
  ];
  steps = [
    { num:'1', icon:'✍️', title:'Escribe lo que sientes', desc:'Sin filtros. Sin poses. Cuéntale como le contarías a un diario lo que realmente está pasando.', bg:'var(--blue-sl)', color:'var(--blue-s)' },
    { num:'2', icon:'⚡', title:'La IA analiza en tu celular', desc:'Sin internet. El modelo procesa tu mensaje localmente. Nadie puede verlo.', bg:'var(--sage-l)', color:'var(--sage-d)' },
    { num:'3', icon:'💡', title:'Recibe honestidad, no palmadas', desc:'MindSync no te dirá "todo va a estar bien". Te ayudará a ver qué está pasando.', bg:'var(--amber-sl)', color:'var(--amber-s)' },
    { num:'4', icon:'🤝', title:'Profesional si lo necesitas', desc:'Si detecta señales de riesgo, te conecta con un psicólogo. Sin que tengas que pedirlo.', bg:'#F3E8FF', color:'#9333EA' }
  ];
  testimonials = [
    { stars:5, quote:'"No me dijo lo que quería escuchar. Me preguntó algo que ningún amigo se atrevía a preguntarme. Eso fue lo que necesitaba."', name:'A. Rodríguez', role:'Ingeniería Civil · 6to semestre', avatar:'AR', bg:'var(--blue-s)' },
    { stars:5, quote:'"Saber que nadie puede leer mis mensajes me hizo escribir con total honestidad por primera vez."', name:'C. Molina', role:'Psicología · Evaluadora beta', avatar:'CM', bg:'var(--sage)' },
    { stars:4, quote:'"A las 2am en plena semana de parciales, tener algo que me escuche y me ayude a organizar la cabeza. No tiene precio."', name:'J. Pedraza', role:'Arquitectura · 4to semestre', avatar:'JP', bg:'var(--amber-s)' }
  ];
  vsRows = [
    { feat:'Privacidad real',       them:'Nube ✗',     us:'Local ✓' },
    { feat:'Respuesta honesta',     them:'Te halagan',  us:'Te confrontan' },
    { feat:'Sin internet',          them:'No ✗',       us:'Siempre ✓' },
    { feat:'Deriva a profesional',  them:'Raro',       us:'Automático ✓' },
    { feat:'Gratuito para usuario', them:'Freemium',   us:'Sí ✓' },
  ];
  starsArr = [1,2,3,4,5];
  email = '';

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

  submitEmail() {
    if (this.email) {
      alert('¡Perfecto! Te avisaremos a ' + this.email + ' cuando MindSync esté listo. 🎉');
      this.email = '';
    }
  }

  starsFor(n: number) { return Array(n).fill('★'); }
  emptyStarsFor(n: number) { return Array(5-n).fill('☆'); }
}
