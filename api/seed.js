const mongoose = require('mongoose');
const axios = require('axios');

// Connect to DB
mongoose.connect(`mongodb://mongo:27017/rickmorty`);

mongoose.connection.once('open', () => {
  console.log('Connected to DataBase');
});

const Character = require('./models/character');

// Drop Old Collection
Character.collection.drop();
console.log('Dropped Old Collection');


loadCharecters(`https://rickandmortyapi.com/api/character/`);

function loadCharecters($url) {

  axios.get($url).then((response) => {
    if (response.data.results && response.data.results.length > 0) {
      Character.create(response.data.results, () => {
        if (response.data.info && response.data.info.next) {
          // Load More Charecters
          loadCharecters(response.data.info.next);
        }

        if (response.data.info && response.data.info.next === null) {
          // No more data to load
          process.exit();
        }
      });
    }
  });
}
