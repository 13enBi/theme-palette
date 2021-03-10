import { reactive, ComponentPublicInstance, render, createVNode } from 'vue';
import Form, { FormType } from './Form';

type State = {
	visible: boolean;
	onClose(): void;
	onSubmit(form: FormType): void;
};

const initInstace = (state: State) => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	const vnode = createVNode({
		render() {
			return <Form {...state}></Form>;
		},
	});

	render(vnode, div);

	return vnode.component!.proxy;
};

let callback: (arg?: any) => any = () => {};

const initState = (): State => {
	const state = reactive({
		visible: false,
	});

	const onClose = () => {
		callback({
			action: 'cancel',
		});

		state.visible = false;
	};

	const onSubmit = (form: FormType) => {
		callback({
			action: 'confirm',
			form,
		});

		state.visible = false;
	};

	return Object.assign(state, {
		onClose,
		onSubmit,
	});
};

const state = initState();

let instance: ComponentPublicInstance<any>;

type Payload = { action: 'cancel' } | { action: 'confirm'; form: FormType };

export default (): Promise<Payload> => {
	!instance && (instance = initInstace(state));

	return new Promise((resolve, reject) => {
		if (state.visible) reject();

		callback = resolve;

		state.visible = true;
	});
};
