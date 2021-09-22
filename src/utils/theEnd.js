import logSymbols from 'log-symbols';
import chalk from 'chalk';

const infoStates = () =>
	console.log(
		chalk.dim(`
			\n${logSymbols.info} ${chalk.cyan(`KEY:`)}
${chalk.dim(`❯ `)}${chalk.cyan(`State:`)} Name of the state
${chalk.dim(`❯ `)}${chalk.cyan(`Cases:`)} Total number of cases in a country
${chalk.dim(`❯ `)}${chalk.cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
${chalk.dim(`❯ `)}${chalk.cyan(`Deaths:`)} Total number of deaths in a state
${chalk.dim(`❯ `)}${chalk.cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
${chalk.dim(`❯ `)}${chalk.cyan(`Recovered:`)} Total number of recovered people
${chalk.dim(`❯ `)}${chalk.cyan(`Active:`)}  Total number of active patients
`)
	);

const infoCountries = () =>
	console.log(
		chalk.dim(`
			\n${logSymbols.info} ${chalk.cyan(`KEY:`)}
${chalk.dim(`❯ `)}${chalk.cyan(`Country:`)} Name of the country
${chalk.dim(`❯ `)}${chalk.cyan(`Cases:`)} Total number of cases in a country
${chalk.dim(`❯ `)}${chalk.cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
${chalk.dim(`❯ `)}${chalk.cyan(`Deaths:`)} Total number of deaths in a country
${chalk.dim(`❯ `)}${chalk.cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
${chalk.dim(`❯ `)}${chalk.cyan(`Recovered:`)} Total number of recovered people
${chalk.dim(`❯ `)}${chalk.cyan(`Active:`)}  Total number of active patients
${chalk.dim(`❯ `)}${chalk.cyan(`Critical:`)} Total number of critical patients
${chalk.dim(`❯ `)}${chalk.cyan(`Per Million:`)} Affected patients per million
`)
	);

const infoVaccinesLocation = () =>
	console.log(
		chalk.dim(`
			\n${logSymbols.info} ${chalk.cyan(`KEY:`)}
${chalk.dim(`❯ `)}${chalk.cyan(`Location:`)} Name of country (or region within country)
${chalk.dim(`❯ `)}${chalk.cyan(`Total Vaccinations`)} Total number of vaccine doses administered
${chalk.dim(`❯ `)}${chalk.cyan(`Total Per Hundred:`)} Total vaccinations per 100 people in the total population of the location
${chalk.dim(`❯ `)}${chalk.cyan(`Daily Per Million:`)} Daily vaccinations per 1,000,000 people in the total population of the location
${chalk.dim(`❯ `)}${chalk.cyan(`Daily:`)} New doses administered per day
`)
	);

export default async (lastUpdated, states, minimal, vaccinations = false) => {
	if (minimal) return console.log();
	console.log(chalk.dim(`${logSymbols.info} ${chalk.cyan(`Last Updated:`)} ${lastUpdated}`));
	if (vaccinations) {
		infoVaccinesLocation();
		return;
	}	
	states && infoStates();
	!states && infoCountries();
};
