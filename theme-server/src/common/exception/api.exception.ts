import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/error-code.enum';

export class ApiException extends HttpException {
	private errorMsg: string;
	private errCode: ApiErrorCode;

	constructor(
		errorMsg: string,
		errCode: ApiErrorCode,
		statusCode: HttpStatus = 500,
	) {
		super(errorMsg, statusCode);

		this.errorMsg = errorMsg;
		this.errCode = errCode;
	}

	getErrorCode(): ApiErrorCode {
		return this.errCode;
	}

	geterrorMsg(): string {
		return this.errorMsg;
	}
}
