import { Catch, ExceptionFilter /*, ArgumentsScope */ } from '@nestjs/common';
import { ApiException } from './api.exception';

@Catch(ApiException)
export class ApiExceptionsFilter implements ExceptionFilter {
	async catch(exception: ApiException, scope: any) {
		const ctx = scope.switchToHttp();
		const response = ctx.getResponse();

		response.status(200).json({
			errorCode: exception.getErrorCode(),
			errorMsg: exception.geterrorMsg(),
		});
	}
}
