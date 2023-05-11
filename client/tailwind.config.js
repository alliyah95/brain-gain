/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            title: ["Roboto", "sans-serif"],
        },
        extend: {
            colors: {
                yellow: "#E3B23C",
                brown: "#423E37",
                "brown-darker": "#3b3731",
                "muted-brown": "#6E675F",
                "light-brown": "#EDEBD7",
                "light-brown-h": "#eae8d1",
                "yellow-darker": "#d4a637",
            },
        },
    },
    plugins: [],
});
