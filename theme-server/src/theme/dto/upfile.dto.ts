import { ValidateIf, IsString } from 'class-validator';

export class UpfileDto {
	@ValidateIf((obj) => {
		return !!obj?.fileName?.match(/\.(less|css)$/);
	})
	@IsString()
	readonly fileName: string;

	@IsString()
	readonly fileData: string;
}
