import { defineComponent } from 'vue';
import FileUpload from './FileUpload';
import Search from './Search';
import FoundList from './FoundList';
import Title from './Title';
import New from './New';
import './style/Header.less';

export default defineComponent(() => () => (
	<>
		<header class="app-header grid">
			<div class="grid-file-search">
				<FileUpload />
				<Search />
			</div>

			<div class="grid-new">
				<New></New>
			</div>

			<div class="grid-title">
				<Title />
			</div>

			<div class="grid-found">
				<FoundList />
			</div>
		</header>
	</>
));
