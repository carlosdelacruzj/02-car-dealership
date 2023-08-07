import { IsString } from "class-validator";

export class CreateCarDto {

    @IsString()
    readonly modelo: string;
    @IsString()
    readonly marca: string;
    
}