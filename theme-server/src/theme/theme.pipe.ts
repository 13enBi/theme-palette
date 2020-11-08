import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import {
	ApiErrorCode,
	ApiErrorMessage,
} from 'src/common/enums/error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';
import { combineURLs, isFileExists } from 'src/common/utils';
import { THEME_PATH } from './const';
import { UpfileDto } from './dto/upfile.dto';

@Injectable()
export class ThemePathCombine implements PipeTransform {
	transform(value: UpfileDto) {
		value.fileName = combineURLs(THEME_PATH, value.fileName);

		return value;
	}
}

@Injectable()
export class ThemeExistsValidate implements PipeTransform {
	constructor(private readonly shouldExist = true) {}

	async transform(value: UpfileDto) {
		const { shouldExist } = this;
		const isExists = await isFileExists(value.fileName);

		if (shouldExist !== isExists) {
			throw new ApiException(
				shouldExist
					? ApiErrorMessage.FILE_NOT_EXISTS
					: ApiErrorMessage.FILE_EXISTSED,
				ApiErrorCode.VALIDATE_FAIL,
			);
		}

		return value;
	}
}
