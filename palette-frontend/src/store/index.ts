import { createStore } from '@13enbi/vhooks';

import state from './state';
import mutations from './mutations';
import getters from './getter';

export default createStore(
	{
		state,
		mutations,
		getters,
	},
	{
		strict: false,
	},
);
