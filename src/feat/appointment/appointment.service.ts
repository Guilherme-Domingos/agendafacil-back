import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service'; 

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const appointment = await this.prisma.appointment.create({
      data: {
        ...data,
        scheduledAt: new Date(data.scheduledAt),
      },
      include: {
        tenant: true,
        user: true,
        service: true,
        staff: true,
      },
    });
    return appointment;
  }

  async findAll(tenantId?: string, userId?: string, staffId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    if (userId) where.userId = userId;
    if (staffId) where.staffId = staffId;

    const appointments = await this.prisma.appointment.findMany({
      where,
      include: {
        tenant: true,
        user: true,
        service: true,
        staff: true,
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    });
    return appointments;
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        tenant: true,
        user: true,
        service: true,
        staff: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const updateData: any = { ...updateAppointmentDto };
    if (updateAppointmentDto.scheduledAt) {
      updateData.scheduledAt = new Date(updateAppointmentDto.scheduledAt);
    }

    return this.prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        tenant: true,
        user: true,
        service: true,
        staff: true,
      },
    });
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
