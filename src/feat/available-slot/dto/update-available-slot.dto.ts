import { PartialType } from '@nestjs/swagger';
import { CreateAvailableSlotDto } from './create-available-slot.dto';

export class UpdateAvailableSlotDto extends PartialType(
  CreateAvailableSlotDto,
) {}
