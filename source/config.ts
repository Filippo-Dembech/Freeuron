import {JSONFilePreset} from 'lowdb/node';
import {Category} from './types.js';
import { join } from 'path';
import os from 'os';
import fs from 'fs';

function getConfigDir() {
	const dir = join(os.homedir(), '.freeuron');
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true});
	}
	return join(dir, 'config.json');
}


type Data = {
	categories: Category[];
};

const defaultData: Data = {
	categories: [],
};

const configDir = getConfigDir();

const config = await JSONFilePreset<Data>(
	configDir,
	defaultData,
);

export function getConfig() {
	return config.data;
}

export async function createCategory(category: Category) {
	try {
		config.data.categories.push(category);
		await config.write();
	} catch (err) {
		console.error(`Can't add new category '${category.name}'.`, err);
	}
}

export async function deleteCategory(category: Category) {
	try {
		config.data.categories = config.data.categories.filter(
			c => c.name !== category.name,
		);
		await config.write();
	} catch (err) {
		console.error(`Can't delete category '${category.name}'.`, err);
	}
}
