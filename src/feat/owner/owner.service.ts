import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOwnerDto) {
    const owner = await this.prisma.owner.create({
      data,
      include: {
        tenant: true,
      },
    });
    return owner;
  }

  async findAll(tenantId?: string) {
    const where = tenantId ? { tenantId } : {};
    const owners = await this.prisma.owner.findMany({
      where,
      include: {
        tenant: true,
      },
    });
    return owners;
  }

  async findOne(id: string) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
      include: {
        tenant: true,
      },
    });

    if (!owner) {
      throw new NotFoundException('Proprietário não encontrado');
    }

    return owner;
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new NotFoundException('Proprietário não encontrado');
    }

    return this.prisma.owner.update({
      where: { id },
      data: updateOwnerDto,
      include: {
        tenant: true,
      },
    });
  }

  async remove(id: string) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new NotFoundException('Proprietário não encontrado');
    }

    return this.prisma.owner.delete({
      where: { id },
    });
  }
}
