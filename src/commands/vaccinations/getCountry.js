import axios from 'axios';
import to from 'await-to-js';
import handleError from 'cli-handle-error';
import exitCountry from './exitCountry.js';
import numberFormat from '../../utils/numberFormat.js'

export default async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		// console.log(countryName && !states && !options.chart)
		try {
			const response = await (
				axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryName}?lastdays=${1}&fullData=true`)
			);
			const thisCountry = response.data;
			const timeline = thisCountry.timeline;
							// Format.
			const format = numberFormat(options.json);

			timeline.forEach(country => {
				table.push([
					`—`,
					thisCountry.country,
					format(country.date),
					format(country.total),
					format(country.totalPerHundred),
					format(country.dailyPerMillion),
					format(country.daily)
				]);
			});



			spinner.stopAndPersist();
			console.log(table.toString());

		} catch (err) {
			exitCountry(err, spinner, countryName);
			err && spinner.stopAndPersist();
			handleError(`API is down, try again later.`, err, false);
		}


	}
};
