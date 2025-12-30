import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { SendContactDto, ContactResponseDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
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

  async sendContactEmail(
    contactDto: SendContactDto,
  ): Promise<ContactResponseDto> {
    const { name, email, message, subject } = contactDto;

    if (!this.validateEmail(email)) {
      throw new InternalServerErrorException('Email inválido.');
    }

    // ensure recipient configured in non-test environments
    if (process.env.NODE_ENV !== 'test' && !process.env.EMAIL_TO) {
      this.logger.warn('EMAIL_TO is not configured; cannot send email');
      throw new InternalServerErrorException('Email delivery not configured.');
    }

    try {
      const mailOptions: nodemailer.SendMailOptions = {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Erro ao enviar email: ${error.message}`,
          error.stack,
        );
      }

      throw new InternalServerErrorException(
        'Erro ao enviar mensagem. Tente novamente mais tarde.',
      );
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private buildEmailTemplate(
    name: string,
    email: string,
    message: string,
  ): string {
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
}
