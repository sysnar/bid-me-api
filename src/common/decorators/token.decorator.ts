import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): ParameterDecorator => {
  // 클라이언트에서 보낸 request 정보 추출
  const request = ctx.switchToHttp().getRequest();

  /*
   *  AuthGuard에서 request에 담은 user객체의 정보를 반환합니다.
   *  @Token() user: User
   */
  return request.user;
});
