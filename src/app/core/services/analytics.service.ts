import { Injectable, signal } from '@angular/core';

export interface StressDataPoint {
  week: string;
  value: number;
  sessions: number;
}

export interface DepartmentMetric {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  students: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  getStressTrend(): StressDataPoint[] {
    return [
      { week: 'Sem 1', value: 72, sessions: 145 },
      { week: 'Sem 2', value: 68, sessions: 162 },
      { week: 'Sem 3', value: 75, sessions: 189 },
      { week: 'Sem 4', value: 65, sessions: 201 },
      { week: 'Sem 5', value: 58, sessions: 234 },
      { week: 'Sem 6', value: 54, sessions: 256 },
      { week: 'Sem 7', value: 49, sessions: 278 },
      { week: 'Sem 8', value: 45, sessions: 301 },
    ];
  }

  getDepartmentMetrics(): DepartmentMetric[] {
    return [
      { name: 'Ingeniería',    score: 62, trend: 'down',   students: 1240 },
      { name: 'Medicina',      score: 71, trend: 'stable', students: 890  },
      { name: 'Psicología',    score: 45, trend: 'down',   students: 560  },
      { name: 'Derecho',       score: 68, trend: 'up',     students: 720  },
      { name: 'Arquitectura',  score: 59, trend: 'down',   students: 480  },
      { name: 'Administración',score: 52, trend: 'down',   students: 1100 },
    ];
  }

  getKPIs() {
    return {
      stressReduction: 28,
      activeUsers: 1847,
      sessionsThisWeek: 301,
      retentionRate: 76,
      professionalReferrals: 23,
      avgSessionMinutes: 14
    };
  }
}
