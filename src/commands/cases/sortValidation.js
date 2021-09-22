import logSymbols from 'log-symbols';
import chalk from 'chalk';
import tables from '../../utils/tables.js'
const { red, green, dim } = chalk;


export default (sortBy, spinner) => {
	if (sortBy !== 'cases') {
		if (Object.keys(tables.sortingKeys).indexOf(sortBy) === -1) {
			spinner.stop();
			console.log(`${logSymbols.error} ${red(`Wrong sorting key!`)}`);
			console.log(`${logSymbols.info} You can only sort data by:
${dim(`-`)} ${green(`cases`)}
${dim(`-`)} ${green(`cases-today`)}
${dim(`-`)} ${green(`deaths`)}
${dim(`-`)} ${green(`deaths-today`)}
${dim(`-`)} ${green(`recovered`)}
${dim(`-`)} ${green(`active`)}
${dim(`-`)} ${green(`critical`)}
${dim(`-`)} ${green(`per-million`)}\n`);
			process.exit(0);
		}
		// It is a custom sort.
		return true;
	}
	// Not a custom sort.
	return false;
};
