import { ApiErrorCode } from '../enums/error-code.enum';

export class ApiException {
	private errorMsg: string;
	private errCode: ApiErrorCode;

	constructor(errorMsg: string, errCode: ApiErrorCode) {
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
