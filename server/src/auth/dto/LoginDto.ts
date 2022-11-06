import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/users/dto/createUserDto";

export class LoginDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}