#!/usr/bin/env node
import ora from 'ora';
import Table from 'cli-table3';
import handleError from 'cli-handle-error';
import chalk from 'chalk';

import cli from './utils/cli.js';
import init from './utils/init.js';
import tables from './utils/tables.js';
import JsonOutput from './utils/jsonOutput.js';
import theEnd from './utils/theEnd.js'

// cases
import getWorldwide from './commands/cases/getWorldWide.js';
import getCountries from './commands/cases/getCountries.js';
import getCountry from './commands/cases/getCountry.js';
import getStates from './commands/cases/getStates.js';
import getBar from './commands/cases/getBar.js';
import getCountryChart from './commands/cases/getCountryChart.js'


// vaccinations
import getWorldWide_V from './commands/vaccinations/getWorldWide.js';
import getCountries_V from './commands/vaccinations/getCountries.js';
import getCountry_V from  './commands/vaccinations/getCountry.js';
import getStates_V from './commands/vaccinations/getStates.js';
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const {
	style,
	single,
	colored,
	singleStates,
	coloredStates,
	borderless,
	vaccines,
	vaccinesHistory,
	vaccinesStates
} = tables;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.


// Cli.
const [input] = cli.input; // TODO
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const reverse = cli.flags.reverse;
const limit = Math.abs(cli.flags.limit);
const chart = cli.flags.chart;
const log = cli.flags.log;
const bar = cli.flags.bar;
const minimal = cli.flags.minimal;
const json = cli.flags.json;
const options = { sortBy, limit, reverse, minimal, chart, log, json, bar };

(async () => {
	//Initialize cli tool
	await init();
	const spinner = ora({ text: '' });
	parseArgs(input);
	// input === 'help' && (await cli.showHelp(0));
	// return;
	const states = input === 'states' ? true : false;
	const country = states ? '' : input;

	// Table
	// const head = xcolor ? single : colored;
	// const headStates = xcolor ? singleStates : coloredStates;
	// const border = minimal ? borderless : {};
	// const OutputFormat = json ? JsonOutput : Table;
	// const output = !states
	// 	? new OutputFormat({ head, style, chars: border })
	// 	: new OutputFormat({ head: headStates, style, chars: border });

	// Vaccine Table
	// const head = xcolor ? single : colored;
	// const headStates = vaccinesState // xcolor ? vaccinesStates : coloredStates;
	const OutputFormat = json ? JsonOutput : Table;
	const border = minimal ? borderless : {};
    const output = !states 
		? new OutputFormat({head : vaccines, style, chars: border})
		: new OutputFormat({head: vaccinesStates, style, chars: border})

	// Display data.
	spinner.start();
	const lastUpdated = await getWorldWide_V(output, states, json);
	await getCountry_V(spinner, output, states, country, options);
	// await getStates_V(spinner, output, states, options);
	await getCountries_V(spinner, output, states, country, options);
	// await getCountryChart(spinner, country, options);
	// await getBar(spinner, country, states, options);

	theEnd(lastUpdated, states, minimal || json, true);
})();


const parseArgs = (input) => {
	if (input && input.length == 0) {
		usage();
		return false;
	}

	if (input && input[0] == '') {

	}
}

const usage = () => {
	console.log(`${chalk.green(`vaccine`)} ${chalk.cyan(`<command>`)} ${chalk.yellow(`[--option]`)}`);
	console.log(`Try ${chalk.green(`vaccine`)} ${chalk.cyan(`--help`)} for more information`)
}

