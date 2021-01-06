import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';


async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const html = resolve(__dirname,'../public')
	//@ts-ignore
	app.useStaticAssets(html);
	await app.listen(3001);
}
bootstrap();
