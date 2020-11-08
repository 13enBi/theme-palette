import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemeModule } from './theme/theme.module';
import { ResponseInterceptor } from './common/interceptor/response';
import { ApiExceptionsFilter } from './common/exception/api.exception.filter';
import { DTOValidationPipe } from './common/pipe/validation.pipe';
import { ExceptionsFilter } from './common/exception/exception.filter';

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
		{
			provide: APP_FILTER,
			useClass: ExceptionsFilter,
		},
		{
			provide: APP_PIPE,
			useClass: DTOValidationPipe,
		},
	],
})
export class AppModule {}
