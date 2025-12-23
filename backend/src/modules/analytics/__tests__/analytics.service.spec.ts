/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../analytics.service';
import { EventType, TrackEventDto } from '../dto/analytics.dto';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsService],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('trackEvent', () => {
    it('should track an event successfully', () => {
      const dto: TrackEventDto = {
        eventType: EventType.PAGE_VIEW,
        eventData: 'Home page',
        userAgent: 'Mozilla/5.0',
      };

      const result = service.trackEvent(dto);

      expect(result).toEqual({ success: true });
    });

    it('should store the event (observable via getStats)', () => {
      const dto: TrackEventDto = {
        eventType: EventType.PROJECT_CLICK,
        eventData: 'Portfolio Terminal',
      };

      service.trackEvent(dto);

      const stats = service.getStats();
      expect(stats.projectClicks).toBe(1);
    });
  });

  describe('getStats', () => {
    it('should return empty stats when no events exist', () => {
      const stats = service.getStats();

      expect(stats).toEqual({
        totalViews: 0,
        projectClicks: 0,
        emailCopies: 0,
        socialClicks: 0,
        themeToggles: 0,
      });
    });

    it('should aggregate stats correctly', () => {
      service.trackEvent({ eventType: EventType.PAGE_VIEW });
      service.trackEvent({ eventType: EventType.PAGE_VIEW });
      service.trackEvent({ eventType: EventType.PROJECT_CLICK });
      service.trackEvent({ eventType: EventType.EMAIL_COPY });
      service.trackEvent({ eventType: EventType.SOCIAL_CLICK });
      service.trackEvent({ eventType: EventType.THEME_TOGGLE });

      const stats = service.getStats();

      expect(stats).toEqual({
        totalViews: 2,
        projectClicks: 1,
        emailCopies: 1,
        socialClicks: 1,
        themeToggles: 1,
      });
    });
  });
});
