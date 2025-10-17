import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tenant' })
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({ status: 201, description: 'Tenant criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tenants' })
  @ApiResponse({ status: 200, description: 'Lista de tenants retornada com sucesso' })
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um tenant por ID' })
  @ApiParam({ name: 'id', description: 'ID do tenant' })
  @ApiResponse({ status: 200, description: 'Tenant encontrado' })
  @ApiResponse({ status: 404, description: 'Tenant não encontrado' })
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tenant' })
  @ApiParam({ name: 'id', description: 'ID do tenant' })
  @ApiBody({ type: UpdateTenantDto })
  @ApiResponse({ status: 200, description: 'Tenant atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Tenant não encontrado' })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tenant' })
  @ApiParam({ name: 'id', description: 'ID do tenant' })
  @ApiResponse({ status: 200, description: 'Tenant removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Tenant não encontrado' })
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
