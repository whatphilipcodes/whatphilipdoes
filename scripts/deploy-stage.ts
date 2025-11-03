import { readdir } from 'node:fs/promises';
import { deploy, excludeDefaults } from '@samkirkland/ftp-deploy';

const vars = {
	SERVER_USER: process.env.SERVER_USER,
	SERVER_HOST: process.env.SERVER_HOST,
	SERVER_PATH_TEST: process.env.SERVER_PATH_TEST,
	SERVER_PASSWORD: process.env.SERVER_PASSWORD,
};

const validate = (variable: string | undefined) => {
	if (variable === undefined) return false;
	if (variable.length < 1) return false;
	return true;
};

type valid = {
	[K in keyof typeof vars]: string;
};

const deployStage = async (v: valid) => {
	await deploy({
		server: v.SERVER_HOST,
		username: v.SERVER_USER,
		password: v.SERVER_PASSWORD,
		protocol: 'ftps', // required for Hetzner konsoleh
		exclude: [...excludeDefaults, '.DS_Store'],
		'local-dir': './dist/',
		'server-dir': v.SERVER_PATH_TEST,
	});
};

const und = Object.entries(vars)
	.filter(([_, value]) => !validate(value))
	.map(([key, _]) => key);

if (und.length > 0) {
	if (und.length === 1) {
		console.error('Error: Missing/invalid environment variable:');
	} else {
		console.error('Error: Missing/invalid environment variables:');
	}
	und.forEach((name) => {
		console.log(name);
	});
	process.exit(1);
} else {
	try {
		const files = await readdir('./dist');
		if (files.length === 0) {
			console.error(
				'Error: ./dist directory is empty. Run build script first.',
			);
			process.exit(1);
		}
		await deployStage(vars as valid);
	} catch {
		console.error(
			'Error: ./dist directory does not exist. Run build script first.',
		);
		process.exit(1);
	}
}
