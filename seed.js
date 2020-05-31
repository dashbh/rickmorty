// const mongoose = require('mongoose');
// // mongoose.Promise = require('bluebird');
// mongoose.connect(`mongodb://localhost:27018/rickmorty`);
// mongoose.connection.once('open', () => {
//   console.log('Connected to DataBase')
// });
// const Character = require('./api/models/character');
// const rick = {
//   "id": 1,
//   "name": "Rick Sanchez",
//   "status": "Alive",
//   "species": "Human",
//   "type": "",
//   "gender": "Male",
//   "origin": {
//       "name": "Earth (C-137)",
//       "url": "https://rickandmortyapi.com/api/location/1"
//   },
//   "location": {
//       "name": "Earth (Replacement Dimension)",
//       "url": "https://rickandmortyapi.com/api/location/20"
//   },
//   "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//   "episode": [
//       "https://rickandmortyapi.com/api/episode/1"
//   ],
//   "url": "https://rickandmortyapi.com/api/character/1",
//   "created": "2017-11-04T18:48:46.250Z"
// };

// Character.collection.drop();
// Character.create([
//   rick
// ]);

// Character.create([
//     {
//         username: 'dan123',
//         email: 'dan@dan.com',
//         postcode: 'SE270JF',
//         password: '123'
//     }, {
//         username: 'ben123',
//         email: 'ben@ben.com',
//         postcode: 'SE191SB',
//         password: '123'
//     }
// ]).then(user => {
//     console.log(`${user.length} characters created`);
// }).catch((err) => {
//     console.log(err);
// }).finally(() => {
//     mongoose.connection.close();
// });

// db.charecter.drop();
// db.charecter.insertMany([
//   rick
// ])

console.log('DOcker UP------------------------------');