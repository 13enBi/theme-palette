const { execSync } = require("child_process");
const { copyFileSync, readdirSync, statSync, mkdirSync, unlinkSync, rmdirSync } = require("fs");
const { resolve } = require("path");

const SERVER_PATH = "./theme-server/";
const FRONTEND_PATH = "./palette-frontend/";

const isFile = (path) => statSync(path).isFile();

const buildServer = () => execSync("yarn run build", { cwd: SERVER_PATH });

const buildFrontend = () => execSync("yarn run build", { cwd: FRONTEND_PATH });

const remove = (path) => {
	readdirSync(path).forEach((name) => {
		const _path = resolve(path, name);
		isFile(resolve(path, name)) ? unlinkSync(_path) : (remove(_path), rmdirSync(_path));
	});
};

const copy = (from, to) => {
	readdirSync(from).forEach((name) => {
		const _from = resolve(from, name),
			_to = resolve(to, name);

		isFile(_from) ? copyFileSync(_from, _to) : (mkdirSync(_to), copy(_from, _to));
	});
};

const run = () => {
	const dist = resolve(FRONTEND_PATH, "dist"),
		public = resolve(SERVER_PATH, "public");

	buildServer();
	console.log(" \033[40;34m  nest build done.\n\033[0m");
	buildFrontend();
	console.log(" \033[40;34m  vite build done.\n\033[0m");

	remove(public);

	copy(dist, public);
	console.log(" \033[40;32m  done.\n\033[0m");
};

run();
