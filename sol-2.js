const csv = require('csv-parser');
const fs = require('fs');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCSVWriter({
  path: 'lowestPrice.csv',
  header: [
    {id: 'SKU', title: 'SKU'},
    {id: 'FIRST_MINIMUM_PRICE', title: 'FIRST_MINIMUM_PRICE'},
    {id: 'SECOND_MINIMUM_PRICE', title: 'SECOND_MINIMUM_PRICE'}
  ]
});

var map = new Map();
var data = [];

fs.createReadStream('./filteredCountry.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (map.has(row.SKU)) {
      map.get(row.SKU).push(row.PRICE.slice(1));
    }
    else {
      map.set(row.SKU, [row.PRICE.slice(1)]);
    }
  })
  .on('end', () => {
    map.forEach(function(val, key) {
      if (val.length > 1) {
        data.push({ SKU: key, FIRST_MINIMUM_PRICE: val[0], SECOND_MINIMUM_PRICE: val[1]});
      }
    });
    csvWriter
      .writeRecords(data)
      .then(()=> console.log('Success!'));
});