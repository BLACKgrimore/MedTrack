/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      screens: {
          sm: '480px',
          msm: '635px',
          md: '768px',
          xmd: '900px',
          lg: '976px',
          xl: '1440px',
          xsm: '320px',
          xlg: '1140px',
         xxlg: '1380px',
         xxl: '1540px',
         xxxl: '1990px'
      },

      extend: {
          colors: {
              darkorange: 'hsl(18, 88%, 58%)',
              lightPink: '	hsl(337, 100%, 91%)',
              lightPurple: 'hsl(288, 42%, 86%)',
              lightorange: 'hsl(29, 100%, 68%)',
              veryLightPurple: 'hsl(293, 42%, 87%)',
              veryLightOrange: 'hsl(22, 100%, 66%)',
              veryLightPink: 'hsl(327, 79%, 95%)',
              brightRed: 'hsl(12, 88%, 59%)',
              brightRedLight: 'hsl(12, 88%, 69%)',
              brightRedSupLight: 'hsl(12, 88%, 95%)',
              darkBlue: 'hsl(228, 39%, 23%)',
              darkGrayishBlue: 'hsl(227, 12%, 61%)',
              veryDarkBlue: 'hsl(233, 12%, 13%)',
              veryPaleRed: 'hsl(13, 100%, 96%)',
              veryLightGray: 'hsl(210, 4%, 55%)',
          },
          backgroundImage: {
              "pooja" : "url('/pooja/pojbg1.png')",
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              'meet': "url('/service-section/image2.jpg')",
              'book': "url('/search_result/book_v.png')",
              'pop-ven': "url('/birthday/bg-pop.png')",
              "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          },
      },

  },
  plugins: [],
};