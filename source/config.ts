import {JSONFilePreset} from 'lowdb/node';
import {Category} from './types.js';

type Data = {
	categories: Category[];
};

const defaultData: Data = {
	categories: [],
};

const config = await JSONFilePreset<Data>(
	'config.json',
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
