import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from '../analytics.controller';
import { AnalyticsService } from '../analytics.service';
import {
  TrackEventDto,
  AnalyticsStatsDto,
  EventType,
} from '../dto/analytics.dto';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  const mockStats: AnalyticsStatsDto = {
    totalViews: 2,
    projectClicks: 1,
    emailCopies: 1,
    socialClicks: 1,
    themeToggles: 1,
  };

  const mockService = {
    trackEvent: jest.fn().mockReturnValue({ success: true }),
    getStats: jest.fn().mockReturnValue(mockStats),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [{ provide: AnalyticsService, useValue: mockService }],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('trackEvent', () => {
    it('should call service.trackEvent and return success', () => {
      const dto: TrackEventDto = {
        eventType: EventType.PAGE_VIEW,
        eventData: 'home',
      };
      const res = controller.trackEvent(dto);

      expect(mockService.trackEvent).toHaveBeenCalledWith(dto);
      expect(res).toEqual({ success: true });
    });
  });

  describe('getStats', () => {
    it('should call service.getStats and return stats', () => {
      const res = controller.getStats();

      expect(mockService.getStats).toHaveBeenCalled();
      expect(res).toBe(mockStats);
    });
  });
});
