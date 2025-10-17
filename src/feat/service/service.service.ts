import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServiceDto) {
    const service = await this.prisma.service.create({
      data,
      include: {
        tenant: true,
      },
    });
    return service;
  }

  async findAll(tenantId?: string) {
    const where = tenantId ? { tenantId } : {};
    const services = await this.prisma.service.findMany({
      where,
      include: {
        tenant: true,
      },
    });
    return services;
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        tenant: true,
        appointments: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
      include: {
        tenant: true,
      },
    });
  }

  async remove(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
