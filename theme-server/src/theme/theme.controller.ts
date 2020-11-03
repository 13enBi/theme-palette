import { Controller, Get, Post, Query } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('theme')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Get('/')
	feachAll() {
		return this.themeService.feachAll();
	}

	@Post('/')
	saveTheme() {}
}
