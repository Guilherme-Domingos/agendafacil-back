import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStaffDto) {
    const staff = await this.prisma.staff.create({
      data,
      include: {
        tenant: true,
      },
    });
    return staff;
  }

  async findAll(tenantId?: string) {
    const where = tenantId ? { tenantId } : {};
    const staff = await this.prisma.staff.findMany({
      where,
      include: {
        tenant: true,
        availableSlots: true,
      },
    });
    return staff;
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: {
        tenant: true,
        appointments: true,
        availableSlots: true,
      },
    });

    if (!staff) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return this.prisma.staff.update({
      where: { id },
      data: updateStaffDto,
      include: {
        tenant: true,
      },
    });
  }

  async remove(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
