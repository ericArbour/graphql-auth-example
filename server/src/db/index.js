const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const createModel = require('./models');

const adapter = new FileSync('src/db/db.json');
const db = low(adapter);

db.defaults({ posts: [], users: [], settings: [], movies: [], shows: [] });

module.exports = {
  models: {
    Settings: createModel(db, 'settings'),
    Post: createModel(db, 'posts'),
    User: createModel(db, 'users'),
    Movie: createModel(db, 'movies'),
    Show: createModel(db, 'shows'),
  },
  db,
};
