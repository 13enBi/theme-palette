import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isObject, isString } from 'class-validator';
import { resolve } from 'path';
import {
	ApiErrorCode,
	ApiErrorMessage,
} from 'src/common/enums/error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';
import { isFileExists } from 'src/common/utils';
import { THEME_PATH } from './const';
import { UpfileDto } from './dto/upfile.dto';

@Injectable()
export class ThemePathCombine implements PipeTransform {
	transform(value: UpfileDto, meta: ArgumentMetadata) {
		if (
			meta.type === 'body' &&
			isObject(value) &&
			isString(value.fileName)
		) {
			value.fileName = resolve(THEME_PATH, value.fileName);
		}
		value.fileName = resolve(THEME_PATH, value.fileName);

		return value;
	}
}

@Injectable()
export class ThemeExistsValidate implements PipeTransform {
	constructor(private readonly shouldExist = true) {}

	async transform(value: UpfileDto) {
		console.log(value.fileName);

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
