const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('../knexfile');

function setupDb() {
  const knex = Knex(knexfile);
  Model.knex(knex);
}

module.exports = setupDb;