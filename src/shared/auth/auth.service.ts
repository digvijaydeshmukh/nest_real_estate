
import * as jwt from 'jsonwebtoken';
import { Injectable, ExecutionContext, CanActivate, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.header.authorization) {
            return false;
        }

        request.user = await this.validateToken(request.header.authorization);
        return true;
    }
    validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
        }

        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            return decoded;
        } catch (err) {
            const message = 'Token Error :' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED)
        }

    }
}