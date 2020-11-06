export enum ApiErrorCode {
	TIMEOUT = -1,
	SUCCESS = 0,
	VALIDATE_FAIL = -2,
}

export enum ApiErrorMessage {
	SUCCESS = 'success',
	INVALID_FILE_FORMAT = '文件格式不正确',
	INVALID_FILE_DATA = '文件内容不正确',
	VALIDATE_FAIL = '参数校验失败',
	NOT_EMPTY = '参数不为空',
	FILE_EXISTSED = '文件已存在',
	FILE_NOT_EXISTS = '文件不存在',
}
