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
import { UpfileDTO } from './DTO/upfile.dto';

@Injectable()
export class ThemePathCombine implements PipeTransform {
	transform(value: UpfileDTO, { type }: ArgumentMetadata) {
		if (
			(type === 'body' || type === 'query') &&
			isObject(value) &&
			isString(value.fileName)
		) {
			value.fileName = resolve(THEME_PATH, value.fileName);
		}

		return value;
	}
}

@Injectable()
export class ThemeExistsValidate implements PipeTransform {
	constructor(private readonly shouldExist = true) {}

	async transform(value: UpfileDTO) {
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
