<template>
	<div class="color-palette-add" @click="visible = true">
		<span> 新增 <PlusOutlined /> </span>
	</div>

	<a-modal title="新建颜色" :visible="visible" @ok="handleOk" @cancel="visible = false">
		<a-form :form="form">
			<a-form-item label="主题类型">
				<a-radio-group name="THEME_TYPES" v-model:value="form.type">
					<a-radio v-for="i in 4" :value="THEME_TYPES[i]"> {{ THEME_TYPES[i] }} </a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="颜色名">
				<a-input v-model:value="form.name" placeholder="颜色名" />
			</a-form-item>
			<a-form-item label="颜色值">
				<a-input v-model:value="form.value" placeholder="颜色值" />
			</a-form-item>
			<a-form-item label="黑板颜色值">
				<a-input v-model:value="form.nightValue" placeholder="颜色值" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import { message } from 'ant-design-vue';
import { THEME_TYPES } from '../config';

interface Form {
	type: string;
	name: string;
	value: string;
	nightValue: string;
}

const useForm = () => {
	const form = reactive({
		type: '',
		name: '',
		value: '',
		nightValue: '',
	});

	const check = () => {
		return Object.values(form).every(Boolean);
	};

	return { form, check };
};

const useNewTheme = (form: Form) => {};

export default {
	setup() {
		const visible = ref(false);
		const handleOk = () => {
			if (!check()) {
				return message.error('不为空');
			}
		};

		const { form, check } = useForm();

		return {
			visible,
			THEME_TYPES,
			form,
			handleOk,
		};
	},
	components: { PlusOutlined },
};
</script>

<style lang="less">
.color-palette-add {
	margin: 0 auto;
	margin-top: 25px;
	cursor: pointer;
	user-select: none;
	height: 40px;
	width: 50%;
	background-color: transparent;
	border: 1px dashed #1b87ed;
	outline: transparent;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	overflow: hidden;
	&::before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(120deg, transparent, hsla(190, 77%, 83%, 0.5), transparent);
		transform: translateX(-100%);
		transition: 0.6s;
	}
	span {
		font-size: 18px;
		color: #1b87ed;
	}
	&:hover {
		&::before {
			transform: translateX(100%);
		}
	}
}
.color-new-input {
	margin-top: 20px;
}
</style>
