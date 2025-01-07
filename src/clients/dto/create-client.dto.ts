import { IsEmail, IsNotEmpty } from 'class-validator';  

export class CreateClientDto {
    @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
    name: string;
    
    @IsNotEmpty({ message: "L'email ne peut pas être vide." })
    @IsEmail({}, { message: "L'email n'est pas valide." })
    email: string;
}
