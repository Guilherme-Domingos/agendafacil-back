import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';

enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID do usuário que está agendando',
    example: 'uuid-do-usuario',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'ID do serviço a ser agendado',
    example: 'uuid-do-servico',
  })
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description: 'ID do funcionário que prestará o serviço',
    example: 'uuid-do-funcionario',
  })
  @IsString()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({
    description: 'Data e hora do agendamento',
    example: '2025-10-15T14:30:00Z',
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;

  @ApiPropertyOptional({
    description: 'Status do agendamento',
    example: 'PENDING',
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'ID do tenant ao qual o agendamento pertence',
    example: 'uuid-do-tenant',
  })
  @IsString()
  @IsNotEmpty()
  tenantId: string;
}
