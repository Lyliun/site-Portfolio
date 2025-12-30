export declare class SendContactDto {
    name: string;
    email: string;
    message: string;
    subject?: string;
}
export declare class ContactResponseDto {
    success: boolean;
    message: string;
    timestamp: Date;
}
