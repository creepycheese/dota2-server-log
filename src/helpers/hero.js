_ = require('lodash');
var allHeroes = require('./heroes.json');

module.exports = {
  heroByName: name => _.find(allHeroes, hero => hero.localized_name == name),
  heroById: id => _.find(allHeroes, hero => hero.id == id),
};
