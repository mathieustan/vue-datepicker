import {
  generateRandomId,
  convertToUnit,
  getSlotType,
  getSlot,
  getZIndex,
  deepMerge,
} from '@/utils/helpers';

describe('Utils: Functions', () => {
  describe('generateRandomId', () => {
    it('should generate a random string', () => {
      const randomId = generateRandomId();
      expect(randomId).toEqual(expect.any(String));
      expect(randomId.length).toEqual(10);
    });
  });

  describe('convertToUnit', () => {
    [{
      description: 'return undefined if value is not defined',
      value: undefined,
      expectedResult: undefined,
    }, {
      description: 'return value with unit if it\'s a number',
      value: 100,
      expectedResult: '100px',
    }, {
      description: 'return value if it\'s a string',
      value: '100px',
      expectedResult: '100px',
    }, {
      description: 'return string when it\'s a string',
      value: 'auto',
      expectedResult: 'auto',
    }].forEach(({ description, value, expectedResult }) => {
      it(`should ${description}`, () => {
        expect(convertToUnit(value)).toEqual(expectedResult);
      });
    });
  });

  describe('getSlotType', () => {
    const params = {
      vm: { $slots: { default: {} }, $scopedSlots: {} },
      name: undefined,
      split: false,
    };
    it.each([
      [
        { ...params },
        undefined,
      ],
      [
        { ...params, name: 'default' },
        'normal',
      ],
      [
        { vm: { ...params.vm, $scopedSlots: { activator: {} } }, name: 'activator', split: false },
        'scoped',
      ],
      [
        { vm: { $slots: { activator: {} }, $scopedSlots: { activator: { name: 'name' } } }, name: 'activator', split: true },
        'v-slot',
      ],
      [
        { vm: { $slots: { activator: {} }, $scopedSlots: { activator: { name: 'name' } } }, name: 'activator', split: false },
        'scoped',
      ],
    ])(
      'When params = %p, should return %p',
      ({ vm, name, split }, expectedResult) => {
        expect(getSlotType(vm, name, split)).toEqual(expectedResult);
      },
    );
  });

  describe('getSlot', () => {
    const defaultDOM = document.createElement('div');
    const activatorFn = jest.fn(() => defaultDOM);

    const params = {
      vm: { $slots: { default: [defaultDOM] }, $scopedSlots: {} },
      name: undefined,
      data: undefined,
      optional: undefined,
    };
    it.each([
      [
        { ...params },
        undefined,
      ],
      [
        { ...params, name: 'default' },
        undefined,
      ],
      [
        { ...params, name: 'default', optional: true },
        [defaultDOM],
      ],
      [
        { ...params, vm: { ...params.vm, $scopedSlots: { activator: activatorFn } }, name: 'activator' },
        defaultDOM,
      ],
    ])(
      'When params = %p, should return %p',
      ({ vm, name, data, optional }, expectedResult) => {
        expect(getSlot(vm, name, data, optional)).toEqual(expectedResult);
      },
    );
  });

  describe('getZIndex', () => {
    const DOMelement = document.createElement('div');
    const DOMelementWithoutZIndex = document.createElement('div');
    DOMelement.style.zIndex = 100;

    it.each([
      [undefined, 0],
      [{ nodeType: undefined }, 0],
      [{ nodeType: undefined }, 0],
      [DOMelement, 100],
      [DOMelementWithoutZIndex, 0],
    ])(
      'When element = %p, should return %p',
      (element, expectedResult) => {
        expect(getZIndex(element)).toEqual(expectedResult);
      },
    );

    it('should retrieve zIndex from parent node if there is no zIndex on element', () => {
      const DOMparent = document.createElement('div');
      DOMparent.style.zIndex = 100;
      const DOMelement = document.createElement('div');
      DOMparent.appendChild(DOMelement);

      expect(getZIndex(DOMelement)).toEqual(100);
    });
  });

  describe('deepMerge', () => {
    it.each([
      [undefined, undefined, {}],
      [{}, {}, {}],
      [{ a: 1 }, { b: { c: 2 } }, { a: 1, b: { c: 2 } }],
    ])(
      'Should merge %p & %p',
      (a, b, expectedResult) => {
        expect(deepMerge(a, b)).toEqual(expectedResult);
      },
    );
  });
});
