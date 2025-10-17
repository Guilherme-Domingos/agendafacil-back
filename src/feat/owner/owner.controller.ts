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
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo proprietário' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'Proprietário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os proprietários' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filtrar por ID do tenant' })
  @ApiResponse({ status: 200, description: 'Lista de proprietários retornada com sucesso' })
  findAll(@Query('tenantId') tenantId?: string) {
    return this.ownerService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um proprietário por ID' })
  @ApiParam({ name: 'id', description: 'ID do proprietário' })
  @ApiResponse({ status: 200, description: 'Proprietário encontrado' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um proprietário' })
  @ApiParam({ name: 'id', description: 'ID do proprietário' })
  @ApiBody({ type: UpdateOwnerDto })
  @ApiResponse({ status: 200, description: 'Proprietário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado' })
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um proprietário' })
  @ApiParam({ name: 'id', description: 'ID do proprietário' })
  @ApiResponse({ status: 200, description: 'Proprietário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado' })
  remove(@Param('id') id: string) {
    return this.ownerService.remove(id);
  }
}
