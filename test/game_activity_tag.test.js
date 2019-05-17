let OpendotaApi = require('../src/opendotaApi');
jest.mock('../src/opendotaApi');

var GameActivityTag = require('../src/GameActivityTag');

describe('GameActivityTag', () => {
  let condition = jest.fn();
  let tag = new GameActivityTag('Test', condition);
  let answerOfLife = {answer: 42};

  describe('static getPredefinedTag(name)', () => {
    it('returns predefined tag by given name', () => {
      expect(GameActivityTag.getPredefinedTag('Rusty').name).toBe('Rusty');
    });
  });

  describe('tags', () => {
    describe('Rusty', () => {
      var rusty = GameActivityTag.getPredefinedTag('Rusty');
      var fakeStat = {player: {profile: {account_id: 33}}};
      const mockWinLose = jest.fn();

      beforeEach(() => {
        OpendotaApi.mockImplementation(() => {
          return {
            winLose: mockWinLose.mockResolvedValue({win: 2, lose: 2}),
          };
        });
      });

      it('requests with OpendotaApi', async () => {
        await rusty.isSatisfied(fakeStat);
        const mockOpendotaApi = OpendotaApi.mock.instances[0];

        expect(OpendotaApi).toHaveBeenCalledTimes(1);
        expect(mockWinLose).toHaveBeenCalledTimes(1);
        expect(mockWinLose).toHaveBeenCalledWith({
          playerId: fakeStat.player.profile.account_id,
          date: 14,
        });
      });

      it('returns true if played less than 3 games in last 2 weeks', async () => {
        mockWinLose.mockResolvedValueOnce({win: 1, lose: 1});

        expect(await rusty.isSatisfied(fakeStat)).toBe(true);
      });

      it('returns false if played more than 3 games in last 2 weeks', async () => {
        mockWinLose.mockResolvedValueOnce({win: 3, lose: 1});

        expect(await rusty.isSatisfied(fakeStat)).toBe(false);
      });
    });
  });

  describe('name', () => {
    it('returns assigned name', () => {
      expect(tag.name).toBe('Test');
    });
  });

  describe('isSatisfied()', () => {
    it('calls given callback function to identify if is satisfied', () => {
      condition.mockReturnValue(true);
      var result = tag.isSatisfied(answerOfLife);
      expect(result).toBe(true);
      expect(condition).toBeCalledWith(answerOfLife);
    });
  });
});
