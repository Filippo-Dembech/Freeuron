import {Category} from './types.js';
import {readFileSync} from 'fs';
import {z} from 'zod';

const CategorySchema = z.object({
	name: z.string(),
	placeholder: z.string(),
});

const ConfigSchema = z.object({
	categories: z.array(CategorySchema),
});

export interface Config {
	categories: Category[];
}

export function getConfig(): Config {
	const raw = JSON.parse(
		readFileSync('./source/freeuron.config.json', 'utf-8'),
	);
	const parseResult = ConfigSchema.safeParse(raw);
	if (!parseResult.success) {
		console.error('Invalid Config JSON shape:', parseResult.error.format());
		throw new Error(`
Invalid config 'freeuron.config.json shape.
	
Expected shape:

{
	"categories": [
		{
			"name": <string>,
			"placeholder": <string>
		},
		{
			"name": <string>,
			"placeholder": <string>
		},
		...
	]
}`);
	}
	return parseResult.data;
}
