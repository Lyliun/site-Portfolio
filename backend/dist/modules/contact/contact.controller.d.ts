import { ContactService } from './contact.service';
import { SendContactDto, ContactResponseDto } from './dto/contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    sendContact(sendContactDto: SendContactDto): Promise<ContactResponseDto>;
}
