import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
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
		return this.themeService.saveTheme(upfileDto);
	}

	@Patch('/')
	updateTheme(@Body() upfileDto: UpfileDto) {
		return this.themeService.updateTheme(upfileDto);
	}
}
