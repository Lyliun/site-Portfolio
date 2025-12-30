import { AnalyticsService } from './analytics.service';
import type { TrackEventDto, AnalyticsStatsDto } from './dto/analytics.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    trackEvent(trackEventDto: TrackEventDto): {
        success: boolean;
    };
    getStats(): AnalyticsStatsDto;
}
