export interface EnvConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
  email: {
    from: string;
    to: string;
  };
  rateLimit: {
    ttl: number;
    limit: number;
  };
}

export const envConfig = (): EnvConfig => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  smtp: {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
  },
  email: {
    from: process.env.EMAIL_FROM ?? '',
    to: process.env.EMAIL_TO ?? '',
  },
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '3600', 10),
    limit: parseInt(process.env.RATE_LIMIT_MAX ?? '5', 10),
  },
});
