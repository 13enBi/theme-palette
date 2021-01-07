import { CacheModule, Module } from '@nestjs/common';

import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { EnvService } from 'src/env.service';

@Module({
	imports: [CacheModule.register({ ttl: 30 })],
	providers: [ThemeService, EnvService],
	controllers: [ThemeController],
})
export class ThemeModule {}
