import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UsePipes,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { UpfileDto } from './dto/upfile.dto';
import { ThemePathCombine, ThemeExistsValidate } from './theme.pipe';

@Controller('theme')
@UsePipes(new ThemePathCombine())
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Get('/')
	feachAll() {
		return this.themeService.feachAll();
	}

	@Post('/')
	async saveTheme(
		@Body(new ThemeExistsValidate(false)) { fileData, fileName }: UpfileDto,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Patch('/')
	async updateTheme(
		@Body(new ThemeExistsValidate(true)) { fileData, fileName }: UpfileDto,
	) {
		this.themeService.writeTheme(fileName, fileData);
	}

	@Delete('/')
	async deleteTheme(
		@Body(new ThemeExistsValidate(true))
		{ fileName }: Pick<UpfileDto, 'fileName'>,
	) {
		return this.themeService.deleteTheme(fileName);
	}
}
