import commaNumber from 'comma-number';
import axios from 'axios';
import handleError from 'cli-handle-error';
import to from 'await-to-js';
import moment from 'moment';
import BlessedContrib from 'blessed-contrib';
import BlessedProgram  from 'blessed';


export default async (spinner, countryName, { chart, log }) => {
	if (countryName && chart) {
		try {
			const response = await axios.get(`https://corona.lmao.ninja/v2/historical/${countryName}`);
			
			let logScale = x => x;
			if (log) {
				logScale = x => (x === 0 ? undefined : Math.log(x));
			}
			const shortDate = x => moment(x, 'MM/DD/YY').format('D MMM');
			const cumulative = (a, b) => (a = a + b);
			const screen = BlessedProgram.screen();
			const line = BlessedContrib.line({
				style: {
					text: 'white',
					baseline: 'white'
				},
				xLabelPadding: 10,
				xPadding: 3,
				abbreviate: true,
				showLegend: true,
				legend: { width: 20 },
				wholeNumbersOnly: false,
				label: countryName.toUpperCase()
			});
			const dates = Object.keys(response.data.timeline.cases).map(shortDate);
			const cases = Object.values(response.data.timeline.cases);
			const deaths = Object.values(response.data.timeline.deaths);
			const recovered = Object.values(response.data.timeline.recovered);
	
			const casesSeries = {
				title: `CASES: ${commaNumber(cases[cases.length - 1])}`,
				x: dates,
				y: cases.map(logScale),
				style: {
					line: 'cyan'
				}
			};
			const deathsSeries = {
				title: `DEATHS: ${commaNumber(deaths[deaths.length - 1])}`,
				x: dates,
				y: deaths.map(logScale),
				style: {
					line: 'red'
				}
			};
			const recoveredSeries = {
				title: `RECOVERED: ${commaNumber(recovered[deaths.length - 1])}`,
				x: dates,
				y: recovered.map(logScale),
				style: {
					line: 'green'
				}
			};
	
			screen.append(line);
			spinner.stop();
			line.setData([casesSeries, deathsSeries, recoveredSeries]);
			screen.render();
	
			await new Promise((resolve, _) => {
				screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
					return process.exit(0);
				});
			});

			if (response.status === 404) {
				spinner.stopAndPersist();
				console.log(
					`${red(
						`${sym.error} Nops. A country named "${countryName}" does not exist…`
					)}\n`
				);
				process.exit(0);
			}
			
		} catch (err) {
			handleError(`API is down, try again later.`, err, false);	
		}
	}
};
