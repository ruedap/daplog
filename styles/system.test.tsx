import { margin, TMarginProps, padding, TPaddingProps } from '@/styles/system'
import { utils } from '@/styles/abstracts/_utils'
import styled, { ThemeProvider } from 'styled-components'
import 'jest-styled-components'
import renderer from 'react-test-renderer'

const themeProps = {
  space: {
    xs: utils.unitize(2),
    sm: utils.unitize(4),
    md: utils.unitize(8),
    lg: utils.unitize(16),
    xl: utils.unitize(32)
  }
}

type TTheme = typeof themeProps
declare module 'styled-components' {
  interface DefaultTheme extends TTheme {}
}

describe('margin()', () => {
  describe('$m', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $m: '0'
      }
      const actual = margin(props)
      expect(actual).toEqual({ margin: '0' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $m="0" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$mt', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $mt: 'xs'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginTop: '2px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $mt="xs" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$mr', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $mr: 'sm'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginRight: '4px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $mr="sm" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$mb', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $mb: 'md'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginBottom: '8px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $mb="md" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$ml', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $ml: 'lg'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginLeft: '16px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $ml="lg" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$mx', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $mx: 'xl'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginLeft: '32px', marginRight: '32px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $mx="xl" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$my', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $my: 'xl'
      }
      const actual = margin(props)
      expect(actual).toEqual({ marginTop: '32px', marginBottom: '32px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`${margin}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $my="xl" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('all props', () => {
    it('should be matched snapshot', () => {
      const Styled = styled.div<TMarginProps>`
        ${margin}
      `
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $m="0" $mt="xs" $mr="sm" $mb="md" $ml="lg" $mx="xl" $my="0" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })
})

describe('padding()', () => {
  describe('$p', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $p: '0'
      }
      const actual = padding(props)
      expect(actual).toEqual({ padding: '0' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $p="0" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$pt', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $pt: 'xs'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingTop: '2px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $pt="xs" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$pr', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $pr: 'sm'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingRight: '4px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $pr="sm" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$pb', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $pb: 'md'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingBottom: '8px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $pb="md" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$pl', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $pl: 'lg'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingLeft: '16px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $pl="lg" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$px', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $px: 'xl'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingLeft: '32px', paddingRight: '32px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $px="xl" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('$py', () => {
    it('should returns converted value', () => {
      const props = {
        theme: { ...themeProps },
        $py: 'xl'
      }
      const actual = padding(props)
      expect(actual).toEqual({ paddingTop: '32px', paddingBottom: '32px' })
    })

    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $py="xl" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })

  describe('all props', () => {
    it('should be matched snapshot', () => {
      const Styled = styled.div<TPaddingProps>`${padding}`
      const actual = renderer.create(
        <ThemeProvider theme={ themeProps }>
          <Styled $p="0" $pt="xs" $pr="sm" $pb="md" $pl="lg" $px="xl" $py="0" />
        </ThemeProvider>
      )
      expect(actual).toMatchSnapshot()
    })
  })
})
