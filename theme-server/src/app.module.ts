import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemeModule } from './theme/theme.module';

@Module({
	imports: [ThemeModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
