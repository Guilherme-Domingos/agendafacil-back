import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePlanDto) {
    const plan = await this.prisma.plan.create({
      data,
    });
    return plan;
  }

  async findAll() {
    const plans = await this.prisma.plan.findMany({
      include: {
        tenants: true,
      },
    });
    return plans;
  }

  async findOne(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
      include: {
        tenants: true,
      },
    });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    return this.prisma.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  async remove(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    return this.prisma.plan.delete({
      where: { id },
    });
  }
}
