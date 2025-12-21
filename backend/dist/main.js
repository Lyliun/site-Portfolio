"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number(process.env.PORT ?? 3001);
    try {
        await app.listen(port);
        console.log(`Application is running on: http://localhost:${port}`);
    }
    catch (err) {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Set a different port with the PORT env var or free the port.`);
            process.exit(1);
        }
        throw err;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map