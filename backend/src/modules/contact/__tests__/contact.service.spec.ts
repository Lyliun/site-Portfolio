import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from '../contact.service';
import { InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendContactDto } from '../dto/contact.dto';
import { Transporter } from 'nodemailer';

jest.mock('nodemailer');

describe('ContactService', () => {
  let service: ContactService;
  let sendMailMock: jest.Mock;
  let transporterMock: jest.Mocked<Transporter>;

  beforeEach(async () => {
    sendMailMock = jest.fn().mockResolvedValue(true);

    transporterMock = {
      sendMail: sendMailMock,
    } as unknown as jest.Mocked<Transporter>;

    jest
      .spyOn(nodemailer, 'createTransport')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .mockReturnValue(transporterMock as unknown as Transporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send contact email', () => {
    it('should send contact email successfully', async () => {
      const dto: SendContactDto = {
        name: 'Lia',
        email: 'lia@email.com',
        message: 'Mensagem de teste',
      };

      const result = await service.sendContactEmail(dto);

      expect(sendMailMock).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Mensagem enviada com sucesso!');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should throw InternalServerErrorException if sendMail fails', async () => {
      sendMailMock.mockRejectedValueOnce(new Error('SMTP error'));

      const dto: SendContactDto = {
        name: 'Lia',
        email: 'lia@email.com',
        message: 'Test error',
      };

      try {
        await service.sendContactEmail(dto);
        fail('Expected sendContactEmail to throw InternalServerErrorException');
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
