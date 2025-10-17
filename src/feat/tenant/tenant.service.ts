import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { auth } from 'src/lib/auth';
import * as crypto from 'crypto';


@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDto) {
    // Verificar se já existe um Owner com esse email
    const existingOwner = await this.prisma.owner.findUnique({
      where: { email: data.ownerEmail },
    });

    // Se o owner já existir, retornar erro de conflito
    if (existingOwner) {
      throw new ConflictException(
        `Já existe um proprietário cadastrado com o email ${data.ownerEmail}. ` +
        `Este email já está associado a outro tenant.`
      );
    }

    // Verificar se já existe um Tenant com esse ownerEmail
    const existingTenant = await this.prisma.tenant.findUnique({
      where: { ownerEmail: data.ownerEmail },
    });

    // Se o tenant com esse email já existir, retornar erro de conflito
    if (existingTenant) {
      throw new ConflictException(
        `Já existe um tenant associado ao email ${data.ownerEmail}.`
      );
    }

    // Verificar se já existe um User do Better Auth com esse email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.ownerEmail },
    });

    if (existingUser) {
      throw new ConflictException(
        `Já existe um usuário cadastrado com o email ${data.ownerEmail}.`
      );
    }

    // 1. Criar o tenant primeiro
    const tenant = await this.prisma.tenant.create({
      data: {
        name: data.name,
        ownerEmail: data.ownerEmail,
        planId: data.planId,
      },
      include: {
        plan: true,
      },
    });

    try {
      // 2. Gerar senha padrão aleatória para o novo owner
      const defaultPassword = crypto.randomBytes(8).toString('hex');
      
      // 3. Criar o usuário usando Better Auth (cria nas tabelas User e Account)
      const betterAuthUser = await auth.api.signUpEmail({
        body: {
          email: data.ownerEmail,
          password: defaultPassword,
          name: data.ownerEmail.split('@')[0], // Nome temporário baseado no email
        },
      });

      if (!betterAuthUser) {
        throw new Error('Falha ao criar usuário no Better Auth');
      }

      // 4. Atualizar o User do Better Auth com o tenantId
      await this.prisma.user.update({
        where: { email: data.ownerEmail },
        data: { 
          tenantId: tenant.id,
          role: 'manager', // Definir role como OWNER
        },
      });

      // 5. Criar o Owner na tabela Owner (registro adicional para tracking)
      const owner = await this.prisma.owner.create({
        data: {
          email: data.ownerEmail,
          name: data.ownerEmail.split('@')[0],
          password: null, // Senha é gerenciada pelo Better Auth
          tenantId: tenant.id,
        },
      });

      // TODO: Enviar email com a senha padrão para o owner
      console.log(`✅ Tenant criado: ${tenant.name}`);
      console.log(`✅ Usuário criado no Better Auth: ${data.ownerEmail}`);
      console.log(`✅ Senha temporária gerada: ${defaultPassword}`);
      console.log(`⚠️  IMPORTANTE: Envie a senha temporária para o email do proprietário`);

      // Retornar o tenant com o owner incluído
      return await this.prisma.tenant.findUnique({
        where: { id: tenant.id },
        include: {
          plan: true,
          owners: true,
        },
      });
    } catch (error) {
      // Se houver erro ao criar o owner, desfazer a criação do tenant
      console.error('❌ Erro ao criar owner, revertendo criação do tenant:', error);
      
      // Tentar deletar o usuário do Better Auth se foi criado
      try {
        const userToDelete = await this.prisma.user.findUnique({
          where: { email: data.ownerEmail },
        });
        
        if (userToDelete) {
          await this.prisma.user.delete({
            where: { email: data.ownerEmail },
          });
          console.log('✅ Usuário do Better Auth revertido');
        }
      } catch (userDeleteError) {
        console.error('❌ Erro ao reverter usuário do Better Auth:', userDeleteError);
      }

      // Deletar o tenant
      await this.prisma.tenant.delete({
        where: { id: tenant.id },
      }).catch(err => {
        console.error('❌ Erro ao reverter criação do tenant:', err);
      });

      throw error;
    }
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
