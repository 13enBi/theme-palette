import { Matches, IsString, IsNotEmpty } from 'class-validator';
import { ApiErrorMessage } from 'src/common/enums/error-code.enum';

export class UpfileDto {
	@IsNotEmpty({ message: ApiErrorMessage.VALIDATE_FAIL })
	@IsString()
	@Matches(/\.(less|css)$/, {
		message: ApiErrorMessage.INVALID_FILE_FORMAT + ',只支持less或者css文件',
	})
	readonly fileName: string;

	@IsNotEmpty({ message: 'fileData' + ApiErrorMessage.NOT_EMPTY })
	@IsString({
		message: ApiErrorMessage.INVALID_FILE_DATA + ',只支持字符文件',
	})
	readonly fileData: string;
}
