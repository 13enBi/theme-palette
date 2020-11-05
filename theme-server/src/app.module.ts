import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemeModule } from './theme/theme.module';
import { ResponseInterceptor } from './common/interceptor/response';
import { ApiExceptionsFilter } from './common/exception/api.exception.filter';

@Module({
	imports: [ThemeModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: ApiExceptionsFilter,
		},
	],
})
export class AppModule {}
