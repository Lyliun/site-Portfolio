import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendContactDto, ContactResponseDto } from './dto/contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  sendContact(
    @Body() sendContactDto: SendContactDto,
  ): Promise<ContactResponseDto> {
    return this.contactService.sendContactEmail(sendContactDto);
  }
}
