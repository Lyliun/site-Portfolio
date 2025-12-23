export enum EventType {
  PAGE_VIEW = 'PAGE_VIEW',
  PROJECT_CLICK = 'PROJECT_CLICK',
  EMAIL_COPY = 'EMAIL_COPY',
  SOCIAL_CLICK = 'SOCIAL_CLICK',
  THEME_TOGGLE = 'THEME_TOGGLE',
}

export type TrackEventDto = {
  eventType: EventType;
  eventData?: string;
  userAgent?: string;
};

export type AnalyticsStatsDto = {
  totalViews: number;
  projectClicks: number;
  emailCopies: number;
  socialClicks: number;
  themeToggles: number;
};
