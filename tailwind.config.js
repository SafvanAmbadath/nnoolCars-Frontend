/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            mdCheckout: "768px",

            lg: "1110px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },

        extend: {
            backgroundImage: {
                LandingImage: "url('./COMPONENTS/images/home.jpg')",
                Landingimage: "url('./COMPONENTS/images/first-banner.jpg')",
                logo: "url('./COMPONENTS/images/logo.png')",

                homepage: 'url("./COMPONENTS/images/home.jpg")',
                loginImg: 'url("./COMPONENTS/images/4500137.jpg")',

                // "particle":'url("./COMPONENTS/images/2187240_d6b94.gif")',
                "1a66b1dffc1c18e0b598ee3bf564e35a5e462a53":
                    'url("./COMPONENTS/images/1a66b1dffc1c18e0b598ee3bf564e35a5e462a53.jpg")',
            },
            width: {
                600: "600px",
                "31rem": "31rem",
                400: "400px",
                350: "350px",
                500: "500px",
                383: "480px",
                "7.5/12": "7.5/12",
                "32%": "25%",
            },
            height: {
                614: "614px",
                86: "86%",
                400: "600px",
                300: "490px",

                "200rem": "46rem",
                "45rem": "45rem",
            },
            fontSize: {
                sm: "0.8rem",
                base: "1rem",
                xl: "1.25rem",
                "1.5rem": "1.5rem",
                "2xl": "1.563rem",
                "3xl": "1.953rem",
                "4xl": "2.441rem",
                "5xl": "3.052rem",
                "4.563rem": "4.563rem",
                "3px": "10px",
            },
            colors: {
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,0,18",
                sigtcolor: "#10a310, #0b7a07",
            },
            boxShadow: {
                "3xl": "-10px 5px 30px -10px rgba(0, 0, 0, 0.9)",
            },
            spacing: {
                "350px": "350px",
            },
        },
        container: {
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem',
          },
        },
    },
    plugins: [
      require("tailwind-scrollbar-hide")
    ],
};
