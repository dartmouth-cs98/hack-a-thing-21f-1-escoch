import meow from 'meow';
import chalk from 'chalk';

const cli =  meow(
	`
	Usage
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`<command>`)} ${chalk.yellow(`[--option]`)}

	Commands
	  ${chalk.cyan(`country-name`)}  Get data for a given country
	  ${chalk.cyan(`states`)}        Get data for all USA states

	Options
	  ${chalk.yellow(`-s`)}, ${chalk.yellow(`--sort`)}      Sort data by type
	  ${chalk.yellow(`-r`)}, ${chalk.yellow(`--reverse`)}   Reverse print order
	  ${chalk.yellow(`-l`)}, ${chalk.yellow(`--limit`)}     Print only N entries
	  ${chalk.yellow(`-b`)}, ${chalk.yellow(`--bar`)}       Print stats in bar charts
	  ${chalk.yellow(`-c`)}, ${chalk.yellow(`--chart`)}     Print chart for a country
	  ${chalk.yellow(`-g`)}, ${chalk.yellow(`--log`)}       Print logarithmic chart
	  ${chalk.yellow(`-x`)}, ${chalk.yellow(`--xcolor`)}    Single colored output
	  ${chalk.yellow(`-m`)}, ${chalk.yellow(`--minimal`)}   Minimalistic CLI output
	  ${chalk.yellow(`-j`)}, ${chalk.yellow(`--json`)}      Output JSON only data

	Examples
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`china`)}
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`states`)}
	  ${chalk.green(`vaccine`)} ${chalk.yellow(`--bar`)}
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`china`)} ${chalk.yellow(`--chart`)}
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`china`)} ${chalk.yellow(`--chart`)} ${chalk.yellow(`--log`)}
	  ${chalk.green(`vaccine`)} ${chalk.yellow(`--sort`)} ${chalk.cyan(`cases-today`)}
	  ${chalk.green(`vaccine`)} ${chalk.yellow(`-s`)} ${chalk.cyan(`critical`)}

	❯ You can also run command + option at once:
	  ${chalk.green(`vaccine`)} ${chalk.cyan(`china`)} ${chalk.yellow(`-x`)} ${chalk.yellow(`-s cases`)}
`,
	{
		importMeta: import.meta,
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			xcolor: {
				type: 'boolean',
				default: false,
				alias: 'x'
			},
			sort: {
				type: 'string',
				default: 'cases',
				alias: 's'
			},
			reverse: {
				type: 'boolean',
				default: false,
				alias: 'r'
			},
			limit: {
				type: 'number',
				default: Number.MAX_SAFE_INTEGER,
				alias: 'l'
			},
			chart: {
				type: 'boolean',
				default: false,
				alias: 'c'
			},
			log: {
				type: 'boolean',
				default: false,
				alias: 'g'
			},
			bar: {
				type: 'boolean',
				default: false,
				alias: 'b'
			},
			minimal: {
				type: 'boolean',
				default: false,
				alias: 'm'
			},
			json: {
				type: 'boolean',
				default: false,
				alias: 'j'
			}
		}
	}
);

export default cli;
