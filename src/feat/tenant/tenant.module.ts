import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { EmailService } from 'src/infra/email/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [TenantController],
  providers: [TenantService, EmailService],
  exports: [TenantService],
})
export class TenantModule {}
