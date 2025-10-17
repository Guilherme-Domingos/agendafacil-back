import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsBoolean, IsDateString, Min, Max } from 'class-validator';

export class CreateAvailableSlotDto {
  @ApiProperty({
    description: 'ID do funcionário',
    example: 'uuid-do-funcionario',
  })
  @IsString()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({
    description: 'Dia da semana (0=domingo, 1=segunda, ..., 6=sábado)',
    example: 1,
    minimum: 0,
    maximum: 6,
  })
  @IsNumber()
  @Min(0)
  @Max(6)
  @IsNotEmpty()
  dayOfWeek: number; // 0-6 (domingo a sábado)

  @ApiProperty({
    description: 'Horário de início do slot',
    example: '2025-10-15T09:00:00Z',
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({
    description: 'Horário de fim do slot',
    example: '2025-10-15T18:00:00Z',
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  endTime: Date;

  @ApiPropertyOptional({
    description: 'Indica se o slot se repete semanalmente',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ApiPropertyOptional({
    description: 'Data específica para o slot (se não for recorrente)',
    example: '2025-10-15T00:00:00Z',
    type: Date,
  })
  @IsDateString()
  @IsOptional()
  specificDate?: Date;

  @ApiProperty({
    description: 'ID do tenant ao qual o slot pertence',
    example: 'uuid-do-tenant',
  })
  @IsString()
  @IsNotEmpty()
  tenantId: string;
}
