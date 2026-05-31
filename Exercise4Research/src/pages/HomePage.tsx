import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6">
            <h1 className="text-5xl font-bold mb-4">
                High Performance Product Search
            </h1>

            <p className="text-gray-600 text-center max-w-xl mb-8">
                Explore a large product catalog using React performance hooks such as
                useTransition and useDeferredValue.
            </p>

            <Link
                to="/products"
                className="px-6 py-3 rounded-lg bg-black text-white hover:opacity-90 transition"
            >
                Start Searching
            </Link>
        </main>
    );
}

export default HomePage;