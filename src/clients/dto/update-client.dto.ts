import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {

    @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
    name: string;

    @IsNotEmpty({ message: "L'email ne peut pas être vide." })
    @IsEmail({}, { message: "L'email n'est pas valide." })
    email: string;
}
