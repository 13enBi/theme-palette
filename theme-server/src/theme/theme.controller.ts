import { Body, Controller, Get, Post } from '@nestjs/common';
import {
	ApiErrorCode,
	ApiErrorMessage,
} from 'src/common/enums/error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';
import { ThemeService } from './theme.service';
import { UpfileDto } from './dto/upfile.dto';

@Controller('theme')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Get('/')
	feachAll() {
		return this.themeService.feachAll();
	}

	@Post('/')
	saveTheme(@Body() upfileDto: UpfileDto) {
		upfileDto.fileData;
	}
}
