import { TrackEventDto, AnalyticsStatsDto, EventType } from './dto/analytics.dto';
export type AnalyticsEvent = {
    eventType: EventType;
    eventData?: string;
    timestamp: Date;
    userAgent?: string;
};
export declare class AnalyticsService {
    private readonly logger;
    private readonly events;
    trackEvent(trackEventDto: TrackEventDto): {
        success: boolean;
    };
    getStats(): AnalyticsStatsDto;
    getTrackedEvents(): readonly AnalyticsEvent[];
}
