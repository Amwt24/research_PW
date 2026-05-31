import { useId } from "react";

import SearchInput from "../components/SearchInput";
import ProductList from "../components/ProductList";
import LoadingIndicator from "../components/LoadingIndicator";

import { useProductSearch } from "../hooks/useProductSearch";

function ProductsPage() {
    const inputId = useId();

    const {
        query,
        isPending,
        filteredProducts,
        handleSearchChange
    } = useProductSearch();

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-2">
                Product Catalog
            </h1>

            <p className="text-gray-600 mb-8">
                Search through thousands of products efficiently.
            </p>

            <SearchInput
                inputId={inputId}
                value={query}
                onChange={handleSearchChange}
            />

            {isPending && (
                <LoadingIndicator />
            )}

            <div className="mb-4 text-sm text-gray-500">
                Results: {filteredProducts.length}
            </div>

            <ProductList
                products={filteredProducts}
            />
        </main>
    );
}

export default ProductsPage;