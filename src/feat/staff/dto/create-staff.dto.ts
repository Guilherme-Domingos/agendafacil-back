import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'Maria Santos',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Função/cargo do funcionário',
    example: 'Cabeleireira',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'Senha do funcionário',
    example: 'senha123',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'ID do tenant ao qual o funcionário pertence',
    example: 'uuid-do-tenant',
  })
  @IsString()
  @IsNotEmpty()
  tenantId: string;
}
