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
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiBody({ type: CreateStaffDto })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filtrar por ID do tenant' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada com sucesso' })
  findAll(@Query('tenantId') tenantId?: string) {
    return this.staffService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário por ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiBody({ type: UpdateStaffDto })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
