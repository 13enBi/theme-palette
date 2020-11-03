import { Module } from '@nestjs/common';

import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';

@Module({
	providers: [ThemeService],
	controllers: [ThemeController],
})
export class ThemeModule {}
