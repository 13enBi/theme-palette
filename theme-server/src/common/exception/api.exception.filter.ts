import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ApiException } from './api.exception';

@Catch(ApiException)
export class ApiExceptionsFilter implements ExceptionFilter {
	async catch(exception: ApiException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		response.status(200);

		response.send({
			errorCode: exception.getErrorCode(),
			errorMsg: exception.geterrorMsg(),
		});
	}
}
