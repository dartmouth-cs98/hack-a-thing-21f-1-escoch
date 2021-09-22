import logSymbols from 'log-symbols';
import chalk from 'chalk';

export default (err, spinner, countryName) => {
	if (
		err &&
		err.response &&
		err.response.status &&
		err.response.status === 404
	) {
		spinner.stopAndPersist();
		console.log(
			`${chalk.red(
				`${logSymbols.error} Oops. A country named "${countryName}" doesn't exist…`
			)}\n`
		);
		process.exit(0);
	}
};
