import welcome from "cli-welcome";

export default async (skipWelcome = false) => {
	!skipWelcome &&
		welcome({
			title: 'vaccine-cli',
			tagLine: 'by Elorm Coch',
			bgColor: '#00000',
			color: '#FFFFFF',
			bold: true,
			clear: false,
			version: '1.0.0',
			description: 'Get up-to-date data on COVID-19 vaccinations'
		});
};