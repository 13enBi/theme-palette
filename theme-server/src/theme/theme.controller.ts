import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UsePipes,
	CacheInterceptor,
	UseInterceptors,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { UpfileDto } from './dto/upfile.dto';
import { ThemePathCombine, ThemeExistsValidate } from './theme.pipe';
import { EnvService } from 'src/env.service';

@Controller('theme')
@UseInterceptors(CacheInterceptor)
export class ThemeController {
	constructor(
		private readonly themeService: ThemeService,
		private readonly envService: EnvService,
	) {}

	@Get('/')
	feachAll() {
		return this.themeService.feachAll();
	}

	@Post('/')
	@UsePipes(new ThemePathCombine())
	async saveTheme(
		@Body(new ThemeExistsValidate(false)) { fileData, fileName }: UpfileDto,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Patch('/')
	@UsePipes(new ThemePathCombine())
	async updateTheme(
		@Body(new ThemeExistsValidate(true)) { fileData, fileName }: UpfileDto,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Delete('/')
	@UsePipes(new ThemePathCombine())
	async deleteTheme(
		@Body(new ThemeExistsValidate(true))
		{ fileName }: Pick<UpfileDto, 'fileName'>,
	) {
		console.log(fileName);

		return this.themeService.deleteTheme(fileName);
	}
}
