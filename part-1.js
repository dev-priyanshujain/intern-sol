const csv = require('csv-parser');
const fs = require('fs');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCSVWriter({
  path: 'filteredCountry.csv',
  header: [
    {id: 'SKU', title: 'SKU'},
    {id: 'DESCRIPTION', title: 'DESCRIPTION'},
    {id: 'YEAR', title: 'YEAR'},
    {id: 'CAPACITY', title: 'CAPACITY'},
    {id: 'URL', title: 'URL'},
    {id: 'PRICE', title: 'PRICE'},
    {id: 'SELLER_INFORMATION', title: 'SELLER_INFORMATION'},
    {id: 'OFFER_DESCRIPTION', title: 'OFFER_DESCRIPTION'},
    {id: 'COUNTRY', title: 'COUNTRY'}
  ]
});

var data = [];
  
fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.COUNTRY.slice(0,3) === 'USA') {
      data.push(row);
    }
  })
  .on('end', () => {
    csvWriter
        .writeRecords(data)
        .then(()=> console.log('Success!'));
});
