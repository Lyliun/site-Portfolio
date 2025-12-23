import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import type { TrackEventDto, AnalyticsStatsDto } from './dto/analytics.dto';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  trackEvent(@Body() trackEventDto: TrackEventDto): { success: boolean } {
    return this.analyticsService.trackEvent(trackEventDto);
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  getStats(): AnalyticsStatsDto {
    return this.analyticsService.getStats();
  }
}
