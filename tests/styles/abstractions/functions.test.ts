import { fibo } from '@/styles/abstractions/funcs'

describe('fibo', () => {
    test(`should return '1597'.`, () => {
        const actual = fibo('xl6')
        expect(actual).toEqual('1597')
    });

    test(`should return '55px'.`, () => {
        const actual = fibo('md', 'px')
        expect(actual).toEqual('55px')
    });

    test(`should return '2rem'.`, () => {
        const actual = fibo('xs6', 'rem')
        expect(actual).toEqual('0.2rem')
    });

    test(`should return '1.44'.`, () => {
        const actual = fibo('xl', 'alpha')
        expect(actual).toEqual('1.44')
    });
})
