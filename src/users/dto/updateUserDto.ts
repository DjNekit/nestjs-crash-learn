import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;
}