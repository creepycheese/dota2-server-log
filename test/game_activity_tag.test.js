var GameActivityTag = require('../src/GameActivityTag');
describe('GameActivityTag', () => {
  let condition = jest.fn();
  let tag = new GameActivityTag('Test', condition);
  let answerOfLife = {answer: 42};

  describe('name', () => {
    it('returns assigned name', () => {
      expect(tag.name).toBe('Test');
    });
  });

  describe('isSatisfied()', () => {
    it('calls given callback function to identify if is satisfied', () => {
      tag.isSatisfied(answerOfLife);
      expect(condition).toBeCalledWith(answerOfLife);
    });
  });
});
