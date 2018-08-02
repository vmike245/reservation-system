const moment = require('moment');
const filterCampsites = require('./campsiteFilter');
const fs = require('fs');

const fileName = process.argv[2];

fs.readFile(fileName, (error, data) => {
  if (error) throw error;
  try {
    const { search, campsites, reservations } = JSON.parse(data);
    if (!search) {
      return console.warn('The search key could not be found in the input file.')
    }
    if (!campsites) {
      return console.warn('The campsites key could not be found in the input file.')
    }
    if (!reservations) {
      return console.warn('The reservations key could not be found in the input file.')
    }
    filterCampsites(search, campsites, reservations).map((campsite) => console.log(campsite.name));
  }
  catch (error) {
    console.warn('The input file must be a valid JSON object');
    console.log(error);
  }
})
