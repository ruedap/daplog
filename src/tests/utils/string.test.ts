import { id2Prams } from '@src/utils/string';
import { TArticlePath } from '@src/types'

describe('id2Prams', () => {
    const id = '2000-01-01-aaa-bbb-ccc';
    const expectedPath: TArticlePath = { year: '2000', month: '01', date: '01', title: 'aaa-bbb-ccc' }

    test('should return TArticlePath object.', () => {
        const r: TArticlePath = id2Prams(id);
        expect(r).toEqual(expectedPath);
    });
})
