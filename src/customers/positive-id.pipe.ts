import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';

/** Rejects zero, negatives, decimals, unsafe integers and non-numeric path parameters. */
@Injectable()
export class PositiveIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    if (!/^[1-9]\d*$/.test(value)) {
      throw new BadRequestException('ID must be a positive integer');
    }

    const id = Number(value);
    if (!Number.isSafeInteger(id)) {
      throw new BadRequestException('ID must be a safe positive integer');
    }
    return id;
  }
}
