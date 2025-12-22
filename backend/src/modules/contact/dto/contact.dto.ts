import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  @MinLength(10, { message: 'Mensagem deve ter no mínimo 10 caracteres' })
  @MaxLength(1000, { message: 'Mensagem deve ter no máximo 1000 caracteres' })
  message: string;

  @IsString()
  subject?: string;
}

export class ContactResponseDto {
  success: boolean;
  message: string;
  timestamp: Date;
}
