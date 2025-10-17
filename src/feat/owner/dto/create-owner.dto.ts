import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({
    description: 'Email do proprietário',
    example: 'proprietario@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nome completo do proprietário',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Senha do proprietário (obrigatório se não usar OAuth)',
    example: 'senha123',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: 'Tipo de autenticação OAuth (ex: google, facebook)',
    example: 'google',
  })
  @IsString()
  @IsOptional()
  oauthType?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário no provedor OAuth',
    example: 'google-user-id-123',
  })
  @IsString()
  @IsOptional()
  oauthId?: string;

  @ApiProperty({
    description: 'ID do tenant ao qual o proprietário pertence',
    example: 'uuid-do-tenant',
  })
  @IsString()
  @IsNotEmpty()
  tenantId: string;
}
