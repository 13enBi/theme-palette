import { defineProviderToken } from '../scanner';

export const Injectable = (): ClassDecorator => defineProviderToken;
