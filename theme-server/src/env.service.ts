import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService extends ConfigService {
	get isDev() {
		return this.get<string>('NODE_ENV') === 'development';
	}
}
