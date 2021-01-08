import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemeModule } from './theme/theme.module';
import { ResponseInterceptor } from './common/interceptor/response';
import { ApiExceptionsFilter } from './common/exception/api.exception.filter';
import { DTOValidationPipe } from './common/pipe/validation.pipe';
import { ExceptionsFilter } from './common/exception/exception.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

@Module({
	imports: [
		//env config
		ConfigModule.forRoot({
			envFilePath: [resolve(__dirname, '../config/env/.env.dev')],
		}),
		// static
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, '../public'),
			exclude: ['/api/*'],
		}),

		ThemeModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TimeoutInterceptor,
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
