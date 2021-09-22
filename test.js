import orderBy from 'lodash.orderby';
import commaNumber from 'comma-number';

var c = [{
    "state": "Alabama",
    "timeline": [
      {
        "total": 4430711,
        "daily": 0,
        "totalPerHundred": 0,
        "dailyPerMillion": 0,
        "date": "9/22/21"
      }
    ]
  },
  {
    "state": "Alaska",
    "timeline": [
      {
        "total": 769981,
        "daily": 0,
        "totalPerHundred": 0,
        "dailyPerMillion": 0,
        "date": "9/22/21"
      }
    ]
  },
  {
    "state": "American Samoa",
    "timeline": [
      {
        "total": 59272,
        "daily": 0,
        "totalPerHundred": 0,
        "dailyPerMillion": 0,
        "date": "9/22/21"
      }
    ]
  },
  {
    "state": "Arizona",
    "timeline": [
      {
        "total": 8095514,
        "daily": 0,
        "totalPerHundred": 0,
        "dailyPerMillion": 0,
        "date": "9/22/21"
      }
    ]
  },
  {
    "state": "Arkansas",
    "timeline": [
      {
        "total": 2961119,
        "daily": 0,
        "totalPerHundred": 0,
        "dailyPerMillion": 0,
        "date": "9/22/21"
      }
    ]
  },]

//   let so = orderBy(c, item => item.timeline[0].total, ['asc'] );
  let so = orderBy(c, `timeline[0].total`, ['desc'] );


  so.map(e => {
      console.log(e.state, commaNumber(e.timeline[0].total));
  })