import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  return user;
});