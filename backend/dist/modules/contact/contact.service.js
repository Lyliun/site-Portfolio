"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let ContactService = ContactService_1 = class ContactService {
    logger = new common_1.Logger(ContactService_1.name);
    transporter;
    constructor() {
        this.initializeTransporter();
    }
    initializeTransporter() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER ?? '',
                pass: process.env.SMTP_PASS ?? '',
            },
        });
    }
    async sendContactEmail(contactDto) {
        const { name, email, message, subject } = contactDto;
        if (!this.validateEmail(email)) {
            throw new common_1.InternalServerErrorException('Email inválido.');
        }
        if (process.env.NODE_ENV !== 'test' && !process.env.EMAIL_TO) {
            this.logger.warn('EMAIL_TO is not configured; cannot send email');
            throw new common_1.InternalServerErrorException('Email delivery not configured.');
        }
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM ?? email,
                to: process.env.EMAIL_TO ?? '',
                subject: subject ?? `Nova mensagem de contato - ${name}`,
                html: this.buildEmailTemplate(name, email, message),
                replyTo: email,
            };
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email enviado com sucesso de ${email}`);
            return {
                success: true,
                message: 'Mensagem enviada com sucesso!',
                timestamp: new Date(),
            };
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error(`Erro ao enviar email: ${error.message}`, error.stack);
            }
            throw new common_1.InternalServerErrorException('Erro ao enviar mensagem. Tente novamente mais tarde.');
        }
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    buildEmailTemplate(name, email, message) {
        return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Space Grotesk', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              text-transform: uppercase;
              font-size: 12px;
            }
            .value {
              margin-top: 5px;
              padding: 10px;
              background: white;
              border-left: 3px solid #667eea;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nova Mensagem do Portfolio</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Mensagem</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>
                Enviado via Portfolio Terminal •
                ${new Date().toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = ContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ContactService);
//# sourceMappingURL=contact.service.js.map