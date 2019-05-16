const FetchPlayerStat = require('../src/FetchPlayerStat');
const playerStat = new FetchPlayerStat({limit: 20, hasStreakGames: 3});

describe('FetchPlayerStat', () =>{
  it('ok', () =>{
    expect(1).toBe(1);
  })
})
