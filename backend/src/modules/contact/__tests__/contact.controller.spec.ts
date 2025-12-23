import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from '../contact.controller';
import { ContactService } from '../contact.service';
import { ContactResponseDto, SendContactDto } from '../dto/contact.dto';

describe('ContactController', () => {
  let controller: ContactController;

  const mockContactService: jest.Mocked<
    Pick<ContactService, 'sendContactEmail'>
  > = {
    sendContactEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: mockContactService,
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ContactService.sendContactEmail and return response', async () => {
    const dto: SendContactDto = {
      name: 'Lia',
      email: 'lia@email.com',
      message: 'Mensagem teste',
    };

    const serviceResponse: ContactResponseDto = {
      success: true,
      message: 'Mensagem enviada com sucesso!',
      timestamp: new Date(),
    };

    mockContactService.sendContactEmail.mockResolvedValue(serviceResponse);

    const result = await controller.sendContact(dto);

    expect(mockContactService.sendContactEmail).toHaveBeenCalledTimes(1);
    expect(mockContactService.sendContactEmail).toHaveBeenCalledWith(dto);
    expect(result).toEqual(serviceResponse);
  });
});
