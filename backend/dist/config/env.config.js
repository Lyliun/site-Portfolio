"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const envConfig = () => ({
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
exports.envConfig = envConfig;
//# sourceMappingURL=env.config.js.map