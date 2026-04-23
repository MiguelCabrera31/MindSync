import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, StressDataPoint, DepartmentMetric } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  kpis: any;
  stressTrend: StressDataPoint[] = [];
  departments: DepartmentMetric[] = [];
  maxStress = 100;
  maxSessions = 400;

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    this.kpis = this.analytics.getKPIs();
    this.stressTrend = this.analytics.getStressTrend();
    this.departments = this.analytics.getDepartmentMetrics();
    this.maxSessions = Math.max(...this.stressTrend.map(d => d.sessions));
  }

  getTrendIcon(trend: string): string {
    return trend === 'down' ? '↓' : trend === 'up' ? '↑' : '→';
  }
  getTrendColor(trend: string): string {
    return trend === 'down' ? 'var(--sage)' : trend === 'up' ? 'var(--rose-s)' : 'var(--amber-s)';
  }
  getBarWidth(val: number, max: number): string {
    return `${(val / max) * 100}%`;
  }
  getStressColor(score: number): string {
    if (score < 50) return 'var(--sage)';
    if (score < 70) return 'var(--amber-s)';
    return 'var(--rose-s)';
  }
}
