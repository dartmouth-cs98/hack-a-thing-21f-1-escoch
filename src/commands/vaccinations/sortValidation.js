import logSymbols from 'log-symbols';
import chalk from 'chalk';
import tables from '../../utils/tables.js'
const { red, green, dim } = chalk;


export default (sortBy, spinner) => {
	if (sortBy !== 'cases') {
		if (Object.keys(tables.sortingKeys_V).indexOf(sortBy) === -1) {
			spinner.stop();
			console.log(`${logSymbols.error} ${red(`Wrong sorting key!`)}`);
			console.log(`${logSymbols.info} You can only sort data by:
${dim(`-`)} ${green(`total`)}
${dim(`-`)} ${green(`daily`)}
${dim(`-`)} ${green(`totalPerHundred`)}
${dim(`-`)} ${green(`daily-dailyPerMillion`)}\n`);
			process.exit(0);
		}
		// It is a custom sort.
		return true;
	}
	// Not a custom sort.
	return false;
};
