import axios from 'axios';
import handleError from 'cli-handle-error';
import numberFormat from '../../utils/numberformat.js';
import to from 'await-to-js';

export default async (table, states, json) => {
    try {
        const response = await (axios.get(`https://corona.lmao.ninja/v2/all`));
        const allData = response.data;
        const format = numberFormat(json);

        // Don't print coz for states we still need that data of updated data.
        if (!states) {
            table.push([
                `→`,
                `Worldwide`,
                format(allData.cases),
                format(allData.todayCases),
                format(allData.deaths),
                format(allData.todayDeaths),
                format(allData.recovered),
                format(allData.active),
                format(allData.critical),
                format(allData.casesPerOneMillion)
            ]);
        }

        const lastUpdated = Date(allData.updated);
        return lastUpdated;
    } catch (err) {
        handleError(`API is down, try again later.`, err, false);
    }
};