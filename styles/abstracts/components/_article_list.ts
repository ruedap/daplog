import { primitives as p } from '../_primitives'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticleList_light = {
  title: {
    colors: {
      bg: `rgba(${p.baseRGB}, 0.42)`,
      hover: {
        bg: `rgba(${p.baseRGB}, 0.34)`
      }
    }
  },
  month: {
    colors: {
      bg: `rgba(${p.baseRGB}, 0.34)`,
      hover: {
        bg: `rgba(${p.baseRGB}, 0.26)`
      }
    }
  },
  date: {
    colors: {
      bg: `rgba(${p.baseRGB}, 0.38)`,
      hover: {
        bg: `rgba(${p.baseRGB}, 0.30)`
      }
    }
  }
} as const
