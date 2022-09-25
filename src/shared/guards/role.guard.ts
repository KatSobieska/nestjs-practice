import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const header = context.switchToHttp().getRequest().headers;
    if (header.role === 'ADMIN' || header.role === 'SELLER') {
      return true;
    }
  }
}
