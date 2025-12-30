"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const port = process.env.PORT || 3001;
    const server = app.getHttpAdapter().getInstance();
    server.get('/favicon.ico', (_req, res) => res.status(204).end());
    await app.listen(port);
    console.log(`🚀 Backend rodando em http://localhost:${port}`);
    console.log(`📧 Contact API: http://localhost:${port}/api/contact`);
    console.log(`📊 Analytics API: http://localhost:${port}/api/analytics`);
    console.log(`💼 Projects API: http://localhost:${port}/api/projects`);
}
bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map