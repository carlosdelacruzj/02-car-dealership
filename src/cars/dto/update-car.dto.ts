import { IsOptional, IsString, IsUUID, } from "class-validator";

export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly modelo?: string;
    @IsString()
    @IsOptional()
    readonly marca?: string;
}