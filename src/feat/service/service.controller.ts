import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filtrar por ID do tenant' })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso' })
  findAll(@Query('tenantId') tenantId?: string) {
    return this.serviceService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um serviço por ID' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
