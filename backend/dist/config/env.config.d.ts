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
export declare const envConfig: () => EnvConfig;
