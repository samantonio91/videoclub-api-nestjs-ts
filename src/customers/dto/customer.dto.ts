import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import type { CustomerData } from '../customer.model.js';

function trimString(value: unknown): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

/** PUT replaces the full customer representation, including optional fields. */
export class CreateCustomerDto implements CustomerData {
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  documentId?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  phone?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  @MaxLength(254)
  email?: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {}
