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
	Query,
	CacheTTL,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { FileNameDTO, UpfileDTO } from './DTO/upfile.dto';
import { ThemePathCombine, ThemeExistsValidate } from './theme.pipe';

@Controller('theme')
@UsePipes(new ThemePathCombine())
@UseInterceptors(CacheInterceptor)
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Get('/all')
	@CacheTTL(1)
	getAllTheme() {
		return this.themeService.getAllThemesName();
	}

	@Get('/')
	featchTheme(
		@Query(new ThemeExistsValidate(true))
		{ fileName }: FileNameDTO,
	) {
		return this.themeService.readTheme(fileName);
	}

	@Post('/')
	async saveTheme(
		@Body(new ThemeExistsValidate(false)) { fileData, fileName }: UpfileDTO,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Patch('/')
	async updateTheme(
		@Body(new ThemeExistsValidate(true)) { fileData, fileName }: UpfileDTO,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Delete('/')
	async deleteTheme(
		@Body(new ThemeExistsValidate(true))
		{ fileName }: FileNameDTO,
	) {
		return this.themeService.deleteTheme(fileName);
	}
}
