import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (success) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + success);
};

const printHelp = () => {
	console.log(
		dedent(`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`),
	);
};

const printWeather = (weather, icon) => {
	console.log(
		dedent(`${chalk.bgYellow(' WEATHER ')} Погода в городе ${weather.name}
		${icon} -${weather.weather[0].description}
		Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
		Скорость ветра: ${weather.wind.speed}м/с
		`),
	);
};

export { printError, printSuccess, printHelp, printWeather };
