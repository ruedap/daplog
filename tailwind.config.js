/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      key: {
        1: 'rgba(24, 63, 83, 0.13)',
        2: 'rgba(24, 63, 83, 0.21)',
        3: 'rgba(24, 63, 83, 0.34)',
        4: 'rgba(24, 63, 83, 0.55)',
        5: 'rgba(24, 63, 83, 0.89)'
      },
      text: {
        body: '#21272d'
      },
      bg: {
        body: 'rgba(24, 63, 83, 0.13)', // key[1]
        content: '#fff'
      },
      state: {
        primary: '#007bff',
        secondary: '#868e96',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#fd7e14',
        danger: '#dc3545'
      }
    },
    fontFamily: {
      dapicons: ['dapicons']
    },
    extend: {
      maxWidth: {
        container: '1000px'
      },
      spacing: {
        xs: '2.1rem', // 21px / 10
        sm: '3.4rem', // 34px / 10
        md: '5.5rem', // 55px / 10
        lg: '8.9rem', // 89px / 10
        xl: '14.4rem' // 144px / 10
      },
      fontSize: {
        xs: '1.3125rem', // 21px / 16
        sm: '2.125rem', // 34px / 16
        md: '3.4375rem', // 55px / 16
        lg: '5.5625rem', // 89px / 16
        xl: '9rem' // 144px / 16
      },
      backgroundImage: {
        'footer-gradient': 'linear-gradient(rgba(24, 63, 83, 0.34) 0, rgba(24, 63, 83, 0.55) 100%)'
      }
    }
  },
  plugins: []
}
