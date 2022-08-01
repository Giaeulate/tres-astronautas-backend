import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';


export const GetUser = createParamDecorator(
    async (_, ctx: ExecutionContext) => {
      const {headers} = ctx.switchToHttp().getRequest();
      const token = headers.authorization;
      if(!token){
        return null
      }
      return
    },
  );
  