import axios from 'axios';
import to from 'await-to-js';
import handleError from 'cli-handle-error';
import exitCountry from './exitCountry.js';
import numberFormat from '../../utils/numberFormat.js'

export default async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		try {
			const response = await (
				axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
			);
			const thisCountry = response.data;

			// Format.
			const format = numberFormat(options.json);

			table.push([
				`—`,
				thisCountry.country,
				format(thisCountry.cases),
				format(thisCountry.todayCases),
				format(thisCountry.deaths),
				format(thisCountry.todayDeaths),
				format(thisCountry.recovered),
				format(thisCountry.active),
				format(thisCountry.critical),
				format(thisCountry.casesPerOneMillion)
			]);
			spinner.stopAndPersist();
			console.log(table.toString());

		} catch (err) {
			exitCountry(err, spinner, countryName);
			err && spinner.stopAndPersist();
			handleError(`API is down, try again later.`, err, false);
		}


	}
};
