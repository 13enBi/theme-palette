import {
	Catch,
	ArgumentsHost,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { ExecException } from 'child_process';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
	async catch(exception: ExecException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const { message = '服务器拉跨了' } = exception;
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		response
			.status(status)
			.header('Content-Type', 'application/json; charset=utf-8')
			.json({
				errorCode: status,
				errorMsg: message,
			});
	}
}
