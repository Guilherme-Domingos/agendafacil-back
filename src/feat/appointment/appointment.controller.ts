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
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo agendamento' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os agendamentos' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filtrar por ID do tenant' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filtrar por ID do usuário' })
  @ApiQuery({ name: 'staffId', required: false, description: 'Filtrar por ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Lista de agendamentos retornada com sucesso' })
  findAll(
    @Query('tenantId') tenantId?: string,
    @Query('userId') userId?: string,
    @Query('staffId') staffId?: string,
  ) {
    return this.appointmentService.findAll(tenantId, userId, staffId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um agendamento por ID' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Agendamento encontrado' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um agendamento' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: 'Agendamento atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um agendamento' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Agendamento removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
