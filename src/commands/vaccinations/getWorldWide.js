import axios from 'axios';
import handleError from 'cli-handle-error';
import numberFormat from '../../utils/numberformat.js';
import to from 'await-to-js';

export default async (table, states, json) => {
    try {
        const response = await (axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${1}&fullData=true`));
        const allData = response.data;
        const format = numberFormat(json);

        // console.log(allData);
        // Don't print coz for states we still need that data of updated data.
        if (!states) {
            allData.forEach(day => {
                table.push([
                    `→`,
                    `Worldwide`,
                    format(day.date),
                    format(day.total),
                    format(day.totalPerHundred),
                    format(day.dailyPerMillion),
                    format(day.daily)                
                ]);  
            })
        }

        // console.log(table.toString());
        const lastUpdated = Date(allData.updated);
        return lastUpdated;
    } catch (err) {
        console.log(err);
        handleError(`API is down, try again later.`, err, false);
    }
};

/**
 * 	
Response body
Download
{
  "country": "Ghana",
  "timeline": [
    {
      "total": 1623582,
      "daily": 0,
      "totalPerHundred": 0,
      "dailyPerMillion": 0,
      "date": "9/21/21"
    }
  ]
}
 */

/**
 * [
  {
    "total": 5977458097,
    "daily": 28804205,
    "totalPerHundred": 75,
    "dailyPerMillion": 3658,
    "date": "9/20/21"
  },
  {
    "total": 5977458097,
    "daily": 0,
    "totalPerHundred": 0,
    "dailyPerMillion": 0,
    "date": "9/21/21"
  }
]
 */