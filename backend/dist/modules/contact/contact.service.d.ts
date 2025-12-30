import { SendContactDto, ContactResponseDto } from './dto/contact.dto';
export declare class ContactService {
    private readonly logger;
    private transporter;
    constructor();
    private initializeTransporter;
    sendContactEmail(contactDto: SendContactDto): Promise<ContactResponseDto>;
    private validateEmail;
    private buildEmailTemplate;
}
