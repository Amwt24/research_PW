/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Aquí podemos extender tus colores personalizados si quisieras
            // pero por ahora lo dejamos limpio para usar Tailwind puro
        },
    },
    plugins: [],
}