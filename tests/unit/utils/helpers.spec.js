import { generateRandomId } from '@/utils/helpers';

describe('Utils: Functions', () => {
  describe('generateRandomId', () => {
    it('should generate a random string', () => {
      const randomId = generateRandomId();
      expect(randomId).toEqual(expect.any(String));
      expect(randomId.length).toEqual(10);
    });
  });
});
