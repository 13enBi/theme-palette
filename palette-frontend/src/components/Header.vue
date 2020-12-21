<template>
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
</template>

<script lang="ts">
import { reactive } from 'vue';
import FileUpload from './FileUpload.vue';
import Search from './Search.vue';
import FoundList from './FoundList.vue';
import Title from './Title.vue';
import New from './New.vue';

export default {
	components: {
		FileUpload,
		Search,
		FoundList,
		Title,
		New,
	},
};
</script>

<style lang="less">
@types: file, search, title, found;
.set-area(@area) {
	&-@{area} {
		grid-area: ~'@{area}';
		padding: 0 10px;
		overflow: hidden;
	}
}
.app-header {
	width: calc(100vw - 30px);
	margin: 0 10px;
	position: fixed;
	top: 10px;
	//	z-index: 10086;
}
.grid {
	display: grid;
	grid-template-columns: 1fr minmax(750px, 2fr) 1fr;

	// grid-template-areas:
	// 	"file search  title"
	// 	"found . . ";

	// .loop(@i) when (@i <style length(@types)+1) {
	// 	.set-area(extract(@types, @i));
	// 	.loop(@i+1);
	// }
	// .loop(1);
	&-new {
		grid-column-start: 3;
	}

	&-file-search {
		padding: 0 10px;
		grid-column-start: 1;
		display: flex;
		justify-content: center;
		//  max-width: 400px;
		gap: 10px;
	}
	&-found {
		grid-column-start: 1;
		grid-row-start: 2;
		z-index: 10;
		display: flex;
		justify-content: center;
	}
	&-title {
		grid-column-start: 3;
	}
}
</style>
