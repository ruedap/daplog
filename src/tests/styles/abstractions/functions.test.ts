import { fibo } from '@src/styles/abstractions/functions'

describe('fibo', () => {
    test(`should return '1597'.`, () => {
        const r = fibo('6xl')
        expect(r).toEqual('1597')
    });

    test(`should return '55px'.`, () => {
        const r = fibo('md', 'px')
        expect(r).toEqual('55px')
    });

    test(`should return '2rem'.`, () => {
        const r = fibo('6xs', 'rem')
        expect(r).toEqual('0.2rem')
    });

    test(`should return '1.44'.`, () => {
        const r = fibo('xl', 'alpha')
        expect(r).toEqual('1.44')
    });
})
