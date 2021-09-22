import logSymbols from 'log-symbols';
import chalk from 'chalk';
const { red, green, dim } = chalk;
import tables from '../../utils/tables.js'

export default (sortBy, spinner) => {
	if (sortBy !== 'cases') {
		if (Object.keys(tables.sortingStateKeys).indexOf(sortBy) === -1) {
			spinner.stop();
			console.log(`${logSymbols.error} ${red(`Wrong sorting key!`)}`);
			console.log(`${logSymbols.info} You can only sort states data by:
${dim(`-`)} ${green(`cases`)}
${dim(`-`)} ${green(`cases-today`)}
${dim(`-`)} ${green(`deaths`)}
${dim(`-`)} ${green(`deaths-today`)}
${dim(`-`)} ${green(`active`)}\n`);
			process.exit(0);
		}
		// It is a custom sort.
		return true;
	}
	// Not a custom sort.
	return false;
};
