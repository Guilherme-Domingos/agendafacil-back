import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service'; 


@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDto) {
    const tenant = await this.prisma.tenant.create({
      data,
      include: {
        plan: true,
      },
    });
    return tenant;
  }

  async findAll() {
    const tenants = await this.prisma.tenant.findMany({
      include: {
        plan: true,
        owners: true,
        services: true,
        staff: true,
        users: true,
      },
    });
    return tenants;
  }

  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        plan: true,
        owners: true,
        services: true,
        staff: true,
        appointments: true,
      },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant não encontrado');
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant não encontrado');
    }

    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
      include: {
        plan: true,
      },
    });
  }

  async remove(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant não encontrado');
    }

    return this.prisma.tenant.delete({
      where: { id },
    });
  }
}
