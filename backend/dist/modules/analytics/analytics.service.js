"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AnalyticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const analytics_dto_1 = require("./dto/analytics.dto");
let AnalyticsService = AnalyticsService_1 = class AnalyticsService {
    logger = new common_1.Logger(AnalyticsService_1.name);
    events = [];
    trackEvent(trackEventDto) {
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
    getStats() {
        const stats = {
            totalViews: 0,
            projectClicks: 0,
            emailCopies: 0,
            socialClicks: 0,
            themeToggles: 0,
        };
        for (const event of this.events) {
            switch (event.eventType) {
                case analytics_dto_1.EventType.PAGE_VIEW:
                    stats.totalViews += 1;
                    break;
                case analytics_dto_1.EventType.PROJECT_CLICK:
                    stats.projectClicks += 1;
                    break;
                case analytics_dto_1.EventType.EMAIL_COPY:
                    stats.emailCopies += 1;
                    break;
                case analytics_dto_1.EventType.SOCIAL_CLICK:
                    stats.socialClicks += 1;
                    break;
                case analytics_dto_1.EventType.THEME_TOGGLE:
                    stats.themeToggles += 1;
                    break;
            }
        }
        return stats;
    }
    getTrackedEvents() {
        return this.events;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = AnalyticsService_1 = __decorate([
    (0, common_1.Injectable)()
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map