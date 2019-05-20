var heroHelper = require('../src/helpers/hero');

describe('heroById', () => {
it('finds hero by id', () => { 
  expect(heroHelper.heroById(22).localized_name).toBe('Zeus');
})
})
