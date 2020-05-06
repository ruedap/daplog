import { getAllArticleIds } from "@src/utils/articles";

describe('getAllArticleIds', () => {
    const fileNames = [
      '2000-01-01-aaa-bbb-ccc.md',
      '2010-10-10-ddddddddddd.md',
      '2020-12-31-e.md',
    ]

    test('should say hello to Tom.', () => {
        const response: { params: { id: string }}[] = getAllArticleIds(fileNames);
        expect(response).toBe('Hello, Tom!');
    });
})
