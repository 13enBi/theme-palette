import { promises as fsPromises, constants as fsconstants } from 'fs';

export const isFileExists = (path: string) => {
	return fsPromises
		.access(path, fsconstants.F_OK)
		.then(() => true)
		.catch(() => false);
};
