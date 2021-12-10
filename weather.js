#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
	printHelp,
	printSuccess,
	printError,
	printWeather,
} from './services/log.service.js';
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY,
} from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
};

const saveSity = async (city) => {
	if (!city.length) {
		printError('Не передан город');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён');
	} catch (e) {
		printError(e.message);
	}
};

const getForcast = async (city) => {
	try {
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e.message.endsWith(404)) {
			printError('Неверно указан город');
		} else if (e.message.endsWith(401)) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
};

const initCli = async () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	} else if (args.s) {
		await saveSity(args.s);
	} else if (args.t) {
		await saveToken(args.t);
	} else {
		getForcast(process.env.CITY || (await getKeyValue(TOKEN_DICTIONARY.city)));
	}
};

initCli();
