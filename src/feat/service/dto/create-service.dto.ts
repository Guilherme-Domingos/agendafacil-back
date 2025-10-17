import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte de cabelo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição do serviço',
    example: 'Corte de cabelo masculino com máquina e tesoura',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Duração do serviço em minutos',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Preço do serviço',
    example: 50.00,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'ID do tenant ao qual o serviço pertence',
    example: 'uuid-do-tenant',
  })
  @IsString()
  @IsNotEmpty()
  tenantId: string;
}
