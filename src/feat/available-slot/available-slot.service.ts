import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvailableSlotDto } from './dto/create-available-slot.dto';
import { UpdateAvailableSlotDto } from './dto/update-available-slot.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AvailableSlotService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAvailableSlotDto) {
    const availableSlot = await this.prisma.availableSlot.create({
      data: {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        specificDate: data.specificDate
          ? new Date(data.specificDate)
          : undefined,
      },
      include: {
        staff: true,
        tenant: true,
      },
    });
    return availableSlot;
  }

  async findAll(tenantId?: string, staffId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    if (staffId) where.staffId = staffId;

    const availableSlots = await this.prisma.availableSlot.findMany({
      where,
      include: {
        staff: true,
        tenant: true,
      },
      orderBy: {
        dayOfWeek: 'asc',
      },
    });
    return availableSlots;
  }

  async findOne(id: string) {
    const availableSlot = await this.prisma.availableSlot.findUnique({
      where: { id },
      include: {
        staff: true,
        tenant: true,
      },
    });

    if (!availableSlot) {
      throw new NotFoundException('Horário disponível não encontrado');
    }

    return availableSlot;
  }

  async update(id: string, updateAvailableSlotDto: UpdateAvailableSlotDto) {
    const availableSlot = await this.prisma.availableSlot.findUnique({
      where: { id },
    });

    if (!availableSlot) {
      throw new NotFoundException('Horário disponível não encontrado');
    }

    const updateData: any = { ...updateAvailableSlotDto };
    if (updateAvailableSlotDto.startTime) {
      updateData.startTime = new Date(updateAvailableSlotDto.startTime);
    }
    if (updateAvailableSlotDto.endTime) {
      updateData.endTime = new Date(updateAvailableSlotDto.endTime);
    }
    if (updateAvailableSlotDto.specificDate) {
      updateData.specificDate = new Date(updateAvailableSlotDto.specificDate);
    }

    return this.prisma.availableSlot.update({
      where: { id },
      data: updateData,
      include: {
        staff: true,
        tenant: true,
      },
    });
  }

  async remove(id: string) {
    const availableSlot = await this.prisma.availableSlot.findUnique({
      where: { id },
    });

    if (!availableSlot) {
      throw new NotFoundException('Horário disponível não encontrado');
    }

    return this.prisma.availableSlot.delete({
      where: { id },
    });
  }
}
