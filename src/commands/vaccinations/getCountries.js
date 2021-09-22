import axios from 'axios';
import chalk from 'chalk';
import orderBy from 'lodash.orderby';
import handleError from 'cli-handle-error';
import sortValidation from './sortValidation.js';
import table from '../../utils/tables.js'
import numberFormat from '../../utils/numberFormat.js'

export default async (
    spinner,
    output,
    states,
    countryName,
    { sortBy, limit, reverse, bar, json }
) => {
    if (!countryName && !states && !bar) {
        sortValidation(sortBy, spinner); 
        try {
           const response = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=${1}&fullData=true
           `);
            let allCountries = response.data;

            // Format.
            const format = numberFormat(json);

            // Sort & reverse.
            const direction = reverse ? 'asc' : 'desc';
            allCountries = orderBy(  
                allCountries,
                `timeline[0].${table.sortingKeys_V[sortBy]}`,
                [direction]
            );

            // Limit.
            allCountries = allCountries.slice(0, limit);

            // Push selected data.
            allCountries.map((oneCountry, count) => {
                const timeline = oneCountry.timeline;
                timeline.forEach(day => {
                    output.push([
                        count + 1,
                        oneCountry.country,
                        format(day.date),
                        format(day.total),
                        format(day.totalPerHundred),
                        format(day.dailyPerMillion),
                        format(day.daily),
                    ]);

                })
                
            });

            spinner.stopAndPersist();
            const isRev = reverse ? `${chalk.dim(` & `)}${chalk.cyan(`Order`)}: reversed` : ``;
            if (!json) {
                spinner.info(`${chalk.cyan(`Sorted by:`)} ${sortBy}${isRev}`);
            }
            console.log(output.toString());

        } catch (err) {
            handleError(`API is down, try again later.`, err, false);
        }

    }
};
