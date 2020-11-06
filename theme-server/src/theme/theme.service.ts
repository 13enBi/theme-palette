import { Injectable } from '@nestjs/common';
import { asyncMap, combineURLs } from 'src/common/utils';
import { UpfileDto } from './dto/upfile.dto';
import { THEME_PATH } from './const';
import { promises, constants } from 'fs';
import { ApiException } from 'src/common/exception/api.exception';
import {
	ApiErrorCode,
	ApiErrorMessage,
} from 'src/common/enums/error-code.enum';
const { readdir, readFile, writeFile, access } = promises;

@Injectable()
export class ThemeService {
	async isFileExists(fileUrl: string) {
		return await access(fileUrl, constants.F_OK)
			.then(() => true)
			.catch(() => false);
	}

	async feachAll() {
		return await asyncMap(await readdir(THEME_PATH), async (fileName) => ({
			fileName,
			fileData: await readFile(combineURLs(THEME_PATH, fileName), 'utf8'),
		}));
	}

	async saveTheme({ fileData, fileName }: UpfileDto) {
		const fileUrl = combineURLs(THEME_PATH, fileName);

		if (await this.isFileExists(fileUrl)) {
			throw new ApiException(
				ApiErrorMessage.FILE_EXISTSED,
				ApiErrorCode.VALIDATE_FAIL,
			);
		}

		return await writeFile(fileUrl, fileData);
	}

	async updateTheme({ fileData, fileName }: UpfileDto) {
		const fileUrl = combineURLs(THEME_PATH, fileName);

		if (!(await this.isFileExists(fileUrl))) {
			throw new ApiException(
				ApiErrorMessage.FILE_NOT_EXISTS,
				ApiErrorCode.VALIDATE_FAIL,
			);
		}

		return await writeFile(fileUrl, fileData);
	}
}
