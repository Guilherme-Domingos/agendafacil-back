import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Nome do plano',
    example: 'Plano Premium',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do plano',
    example: 'Plano com todas as funcionalidades disponíveis',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Preço mensal do plano',
    example: 99.90,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Funcionalidades do plano em formato JSON',
    example: { maxUsers: 100, maxAppointments: 1000, support: true },
  })
  @IsObject()
  @IsNotEmpty()
  features: any; // JSON
}
