export enum ApiErrorCode {
	TIMEOUT = -1,
	SUCCESS = 0,
	INVALID_FILE_FORMAT = 250, //不是less or css
}

export enum ApiErrorMessage {
	SUCCESS = 'success',
	INVALID_FILE_FORMAT = '文件格式不正确，只支持less或者css文件',
}
