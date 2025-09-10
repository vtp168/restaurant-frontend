// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    // tailwind.config.js
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto','Kantumruy Pro', 'sans-serif'], // this overrides Tailwind's default
                moul:['Roboto','Moul','sans-serif'] // using font-moul
            },
        },
    },
    plugins: [],
}