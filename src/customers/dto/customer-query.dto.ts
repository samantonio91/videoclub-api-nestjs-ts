import { Transform } from 'class-transformer';
import { IsString, MaxLength, ValidateIf } from 'class-validator';
import type { CustomerFilters } from '../customer.model.js';

export class CustomerQueryDto implements CustomerFilters {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MaxLength(120)
  name?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MaxLength(80)
  documentId?: string;
}
