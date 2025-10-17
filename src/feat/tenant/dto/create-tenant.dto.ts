import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    description: 'Nome do tenant (organização/empresa)',
    example: 'Empresa XYZ',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Schema do banco de dados para o tenant',
    example: 'empresa_xyz',
  })
  @IsString()
  @IsNotEmpty()
  schema: string;

  @ApiProperty({
    description: 'Email do proprietário do tenant',
    example: 'proprietario@empresaxyz.com',
  })
  @IsEmail()
  @IsNotEmpty()
  ownerEmail: string;

  @ApiProperty({
    description: 'ID do plano escolhido',
    example: 'uuid-do-plano',
  })
  @IsString()
  @IsNotEmpty()
  planId: string;
}
