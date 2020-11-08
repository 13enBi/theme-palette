import { Matches, IsString, IsNotEmpty } from 'class-validator';

import { ApiErrorMessage } from 'src/common/enums/error-code.enum';

export class UpfileDto {
	@Matches(/\.(less|css)$/, {
		message: ApiErrorMessage.INVALID_FILE_FORMAT + ',只支持less或者css文件',
	})
	@IsString()
	@IsNotEmpty({ message: 'fileName' + ApiErrorMessage.NOT_EMPTY })
	fileName: string;

	@IsString({
		message: ApiErrorMessage.INVALID_FILE_DATA + ',只支持字符文件',
	})
	@IsNotEmpty({ message: 'fileData' + ApiErrorMessage.NOT_EMPTY })
	readonly fileData: string;
}
