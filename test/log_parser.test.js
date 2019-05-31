const Dota2ServerLog = require('../src/dota2ServerLog.js');
const parser = new Dota2ServerLog();

describe('parseLogEntry', () => {
  describe('when parsing valid log entry', () => {
    let matchEntry =
      '08/14/2018 - 19:54:20: =[A:1:3153715204:10506] (Lobby 25740698217955586 DOTA_GAMEMODE_SD 0:[U:1:84211746] 1:[U:1:103985192] 2:[U:1:166168942] 3:[U:1:152371909] 4:[U:1:237048375] 5:[U:1:76358101] 6:[U:1:190870601] 7:[U:1:122743465] 8:[U:1:358751748] 9:[U:1:365942695]) (Party 25739797607588480 0:[U:1:103985192] 1:[U:1:166168942] 2:[U:1:152371909] 3:[U:1:237048375])';
    let expectedIds = [
      84211746,
      103985192,
      166168942,
      152371909,
      237048375,
      76358101,
      190870601,
      122743465,
      358751748,
      365942695,
      103985192,
      166168942,
      152371909,
      237048375,
    ];

    it('returns array of steamIds', () => {
      expect(parser.parseLogEntry(matchEntry)).toStrictEqual(expectedIds);
    });
  });

  describe('when parsing invalid log entry', () => {
    it('returns null', () => {
      expect(parser.parseLogEntry('SS')).toBe(null);
    });
  });
});

describe('slotIdFromLastMatch(logPath, steamId)', () => {
  let filePath = './test/server_log.txt';
  let targetSteamIdRadiant = 174830156;
  let targetSteamIdDire = 166168942;

  it('returns slotId for given steamId and logPath', async () => {
    expect.assertions(2);

    var result = await parser.slotIdFromLastMatch(
      filePath,
      targetSteamIdRadiant,
    );
    var direResult = await parser.slotIdFromLastMatch(
      filePath,
      targetSteamIdDire,
    );

    expect(result).toEqual(0);
    expect(direResult).toEqual(132);
  });
});

describe('lastMatchSteamIds', () => {
  describe('given filePath', () => {
    let filePath = './test/server_log.txt';
    let expectedIds = [
      174830156,
      445444750,
      27372708,
      126702952,
      349919626,
      412448050,
      416755244,
      302693500,
      910673288,
      166168942,
      166168942,
    ];

    it('returns ids from last match', async () => {
      expect.assertions(1);
      const data = await parser.lastMatchSteamIds(filePath);

      expect(data).toStrictEqual(expectedIds);
    });
  });
});
