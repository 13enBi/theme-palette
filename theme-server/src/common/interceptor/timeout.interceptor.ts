import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ApiErrorCode, ApiErrorMessage } from '../enums/error-code.enum';
import { ApiException } from '../exception/api.exception';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			timeout(5000),
			catchError((err) => {
				if (err instanceof TimeoutError) {
					return throwError(
						new ApiException(
							ApiErrorMessage.TIMEOUT,
							ApiErrorCode.TIMEOUT,
						),
					);
				}
				return throwError(err);
			}),
		);
	}
}
