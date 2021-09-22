import axios from 'axios';
import chalk from 'chalk';
import orderBy from 'lodash.orderby';
import handleError from 'cli-handle-error';
import sortStatesValidation from './sortStatesValidation.js';
import table from '../../utils/tables.js'
import numberFormat from '../../utils/numberFormat.js'
const { cyan, dim } = chalk;

export default async (
	spinner,
	output,
	states,
	{ sortBy, limit, reverse, json, bar }
) => {
	if (states && !bar) {
		sortStatesValidation(sortBy, spinner);
		try {
			const response = await (
				axios.get(`https://corona.lmao.ninja/v2/states`)
			);
			
			let allStates = response.data;
	
			// Limit.
			allStates = allStates.slice(0, limit);
	
			// Format.
			const format = numberFormat(json);
	
			// Sort & reverse.
			const direction = reverse ? 'asc' : 'desc';
			allStates = orderBy(allStates, [table.sortingStateKeys[sortBy]], [direction]);
	
			// Push selected data.
			allStates.map((oneState, count) => {
				output.push([
					count + 1,
					oneState.state,
					format(oneState.cases),
					format(oneState.todayCases),
					format(oneState.deaths),
					format(oneState.todayDeaths),
					format(oneState.active)
				]);
			});
	
			spinner.stopAndPersist();
			const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
			if (!json) {
				spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
			}
			console.log(output.toString());
			
		} catch (err) {
			console.log(err)
			handleError(`API is down, try again later.`, err, false);
		}
		
	}
};
