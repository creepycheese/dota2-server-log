"use strict";

_ = require('lodash');

var allHeroes = require('./heroes.json');

module.exports = {
  heroByName: function heroByName(name) {
    return _.find(allHeroes, function (hero) {
      return hero.localized_name == name;
    });
  },
  heroById: function heroById(id) {
    return _.find(allHeroes, function (hero) {
      return hero.id == id;
    });
  }
};