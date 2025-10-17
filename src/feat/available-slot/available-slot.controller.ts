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
import { AvailableSlotService } from './available-slot.service';
import { CreateAvailableSlotDto } from './dto/create-available-slot.dto';
import { UpdateAvailableSlotDto } from './dto/update-available-slot.dto';

@ApiTags('Available Slot')
@Controller('available-slot')
export class AvailableSlotController {
  constructor(private readonly availableSlotService: AvailableSlotService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo slot disponível' })
  @ApiBody({ type: CreateAvailableSlotDto })
  @ApiResponse({ status: 201, description: 'Slot criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAvailableSlotDto: CreateAvailableSlotDto) {
    return this.availableSlotService.create(createAvailableSlotDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os slots disponíveis' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filtrar por ID do tenant' })
  @ApiQuery({ name: 'staffId', required: false, description: 'Filtrar por ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Lista de slots retornada com sucesso' })
  findAll(
    @Query('tenantId') tenantId?: string,
    @Query('staffId') staffId?: string,
  ) {
    return this.availableSlotService.findAll(tenantId, staffId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um slot disponível por ID' })
  @ApiParam({ name: 'id', description: 'ID do slot' })
  @ApiResponse({ status: 200, description: 'Slot encontrado' })
  @ApiResponse({ status: 404, description: 'Slot não encontrado' })
  findOne(@Param('id') id: string) {
    return this.availableSlotService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um slot disponível' })
  @ApiParam({ name: 'id', description: 'ID do slot' })
  @ApiBody({ type: UpdateAvailableSlotDto })
  @ApiResponse({ status: 200, description: 'Slot atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Slot não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateAvailableSlotDto: UpdateAvailableSlotDto,
  ) {
    return this.availableSlotService.update(id, updateAvailableSlotDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um slot disponível' })
  @ApiParam({ name: 'id', description: 'ID do slot' })
  @ApiResponse({ status: 200, description: 'Slot removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Slot não encontrado' })
  remove(@Param('id') id: string) {
    return this.availableSlotService.remove(id);
  }
}
