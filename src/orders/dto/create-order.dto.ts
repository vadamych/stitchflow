import { IsString, IsNotEmpty, IsBoolean, IsIn, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  clientName: string;

  @IsString()
  @IsIn(['Hoodie', 'Shirt', 'Polo'])
  garmentType: string;

  @IsBoolean()
  isUrgent: boolean;
}
