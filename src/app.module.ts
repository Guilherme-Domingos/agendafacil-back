import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { AvailableSlotModule } from './feat/available-slot/available-slot.module'; 
import { TenantModule } from './feat/tenant/tenant.module';
import { PlanModule } from './feat/plan/plan.module';
import { OwnerModule } from './feat/owner/owner.module';
import { ServiceModule } from './feat/service/service.module';
import { StaffModule } from './feat/staff/staff.module';
import { AppointmentModule } from './feat/appointment/appointment.module';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    PrismaModule,
    TenantModule,
    PlanModule,
    OwnerModule,
    ServiceModule,
    StaffModule,
    AppointmentModule,
    AvailableSlotModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}