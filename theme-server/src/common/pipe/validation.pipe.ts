import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiErrorCode } from '../enums/error-code.enum';
import { ApiException } from '../exception/api.exception';

@Injectable()
export class DTOValidationPipe implements PipeTransform<any> {
	async transform(value, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);

		if (errors.length > 0) {
			throw new ApiException(
				Object.values(errors[0].constraints)[0],
				ApiErrorCode.VALIDATE_FAIL,
			);
		}

		return value;
	}

	private toValidate(metatype): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.find((type) => metatype === type);
	}
}
