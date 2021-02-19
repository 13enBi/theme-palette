import { CacheModule, Module } from '@nestjs/common';

import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { EnvService } from 'src/env.service';
import { TTT } from './theme2';

@Module({
	imports: [CacheModule.register({ ttl: 30 })],
	providers: [TTT,ThemeService, EnvService],
	controllers: [ThemeController],
})
export class ThemeModule {}
