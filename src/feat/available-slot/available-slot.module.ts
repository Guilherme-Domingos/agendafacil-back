import { Module } from '@nestjs/common';
import { AvailableSlotService } from './available-slot.service';
import { AvailableSlotController } from './available-slot.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AvailableSlotController],
  providers: [AvailableSlotService],
  exports: [AvailableSlotService],
})
export class AvailableSlotModule {}
