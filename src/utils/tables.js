import chalk from 'chalk';
import cli from './cli.js';

const plain = text => text;
const json = cli.flags.json;
const green = json ? plain : chalk.green;
const red = json ? plain : chalk.red;
const yellow = json ? plain : chalk.yellow;
const dim = json ? plain : chalk.dim;

const tables  = {
	single: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Active`,
		`Critical`,
		`Per Million`
	],
	colored: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`${yellow(`Active`)}`,
		`${red(`Critical`)}`,
		`Per Million`
	],
	singleStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Active`
	],
	coloredStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${yellow(`Active`)}`
	],
	style: { head: ['cyan'] },
	borderless: {
		top: '',
		'top-mid': '',
		'top-left': '',
		'top-right': '',
		bottom: '',
		'bottom-mid': '',
		'bottom-left': '',
		'bottom-right': '',
		left: '',
		'left-mid': '',
		mid: '',
		'mid-mid': '',
		right: '',
		'right-mid': '',
		middle: ' '
	},
	sortingKeys_V: {
		country: 'country',
		total: 'total',
		'vaccines-today': 'daily',
		totalPerHundred: 'totalPerHundred',
		dailyPerMillion: 'dailyPerMillion'
	},
	sortingKeys: {
		country: 'country',
		cases: 'cases',
		'cases-today': 'todayCases',
		deaths: 'deaths',
		'deaths-today': 'todayDeaths',
		recovered: 'recovered',
		active: 'active',
		critical: 'critical',
		'per-million': 'casesPerOneMillion'
	},
	sortingStateKeys: {
		state: 'state',
		cases: 'cases',
		'cases-today': 'todayCases',
		deaths: 'deaths',
		'deaths-today': 'todayDeaths',
		active: 'active'
	},
	sortingStateKeys_V: {
		state: 'state',
		total: 'total',
		'vaccines-today': 'daily',
		totalPerHundred: 'totalPerHundred',
		dailyPerMillion: 'dailyPerMillion'
	},
    vaccines: [
        `#`,
		`Location`,
		`Date`,
		`Total Vaccinations`,
		`Total Per Hundred`,
		`Daily Per Million`,
		`Daily`
    ],
	vaccinesStates: [
        `#`,
		`Location`,
		`Date`,
		`Total Vaccinations`,
		`Total Per Hundred`,
		`Daily Per Million`,
		`Daily`
    ],
    vaccinesHistory: [
        `#`,
        `Location`,
        `Date`,
        `Total Vaccinations`,
		`Total Per Hundred`,
		`Daily Per Million`,
		`Daily`
    ]
};

export default tables;

/**
 * "total": 5977458097,
    "daily": 0,
    "totalPerHundred": 0,
    "dailyPerMillion": 0,
    "date": "9/21/21"
 */