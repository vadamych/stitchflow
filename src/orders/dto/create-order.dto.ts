import { IsString, IsNotEmpty, IsBoolean, IsIn, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsIn(['Hoodie', 'Shirt', 'Polo'])
  garmentType: string;

  @IsBoolean()
  isUrgent: boolean;
}
