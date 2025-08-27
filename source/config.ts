import {JSONFilePreset} from 'lowdb/node';
import {Category} from './types.js';
import { join } from 'path';
import os from 'os';
import fs from 'fs';

function getConfigDir() {
    const dir = join(os.homedir(), '.freeuron');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const configPath = join(dir, 'config.json');
    if (!fs.existsSync(configPath)) {
        const defaultData = {
            categories: [
                { name: "todo", placeholder: "Enter your todo here..." },
                { name: "question", placeholder: "Enter your question here..." },
                { name: "insight", placeholder: "Enter your insight here..." }
            ]
        };
        fs.writeFileSync(configPath, JSON.stringify(defaultData, null, 4)); // pretty print
    }

    return configPath;
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
