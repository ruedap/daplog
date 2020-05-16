import { fibo } from '@/styles/abstractions/functions'

describe('fibo', () => {
    test(`should return '1597'.`, () => {
        const r = fibo('xl6')
        expect(r).toEqual('1597')
    });

    test(`should return '55px'.`, () => {
        const r = fibo('md', 'px')
        expect(r).toEqual('55px')
    });

    test(`should return '2rem'.`, () => {
        const r = fibo('xs6', 'rem')
        expect(r).toEqual('2rem')
    });

    test(`should return '1.44'.`, () => {
        const r = fibo('xl', 'alpha')
        expect(r).toEqual('1.44')
    });
})
