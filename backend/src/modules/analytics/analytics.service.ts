import { Injectable, Logger } from '@nestjs/common';
import {
  TrackEventDto,
  AnalyticsStatsDto,
  EventType,
} from './dto/analytics.dto';

export type AnalyticsEvent = {
  eventType: EventType;
  eventData?: string;
  timestamp: Date;
  userAgent?: string;
};

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);
  private readonly events: AnalyticsEvent[] = [];

  trackEvent(trackEventDto: TrackEventDto): { success: boolean } {
    const { eventType, eventData, userAgent } = trackEventDto;

    this.events.push({
      eventType,
      eventData,
      timestamp: new Date(),
      userAgent,
    });

    this.logger.log(`Event tracked: ${eventType} - ${eventData ?? 'N/A'}`);

    return { success: true };
  }

  getStats(): AnalyticsStatsDto {
    const stats: AnalyticsStatsDto = {
      totalViews: 0,
      projectClicks: 0,
      emailCopies: 0,
      socialClicks: 0,
      themeToggles: 0,
    };

    for (const event of this.events) {
      switch (event.eventType) {
        case EventType.PAGE_VIEW:
          stats.totalViews += 1;
          break;

        case EventType.PROJECT_CLICK:
          stats.projectClicks += 1;
          break;

        case EventType.EMAIL_COPY:
          stats.emailCopies += 1;
          break;

        case EventType.SOCIAL_CLICK:
          stats.socialClicks += 1;
          break;

        case EventType.THEME_TOGGLE:
          stats.themeToggles += 1;
          break;
      }
    }

    return stats;
  }

  /**
   * 🔎 Apenas para testes (não expor em controller)
   */
  getTrackedEvents(): readonly AnalyticsEvent[] {
    return this.events;
  }
}
