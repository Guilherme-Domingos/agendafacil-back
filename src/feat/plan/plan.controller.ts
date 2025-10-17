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
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@ApiTags('Plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo plano' })
  @ApiBody({ type: CreatePlanDto })
  @ApiResponse({ status: 201, description: 'Plano criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos' })
  @ApiResponse({ status: 200, description: 'Lista de planos retornada com sucesso' })
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um plano por ID' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  @ApiResponse({ status: 200, description: 'Plano encontrado' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um plano' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({ status: 200, description: 'Plano atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um plano' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  @ApiResponse({ status: 200, description: 'Plano removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
