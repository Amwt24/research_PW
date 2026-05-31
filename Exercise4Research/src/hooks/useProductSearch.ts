import {
    useState,
    useMemo,
    useTransition,
    useDeferredValue,
    type ChangeEvent
} from "react";

import { products } from "../store/productsData";
import { filterProducts } from "../store/filterProducts";


export function useProductSearch() {
    const [query, setQuery] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [isPending, startTransition] = useTransition();

    const deferredSearchTerm =
        useDeferredValue(searchTerm);

    const filteredProducts = useMemo(() => {
        return filterProducts(
            products,
            deferredSearchTerm
        );
    }, [deferredSearchTerm]);

    const handleSearchChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        // Urgent update
        setQuery(value);

        // Non-urgent update
        startTransition(() => {
            setSearchTerm(value);
        });
    };

    return {
        query,
        isPending,
        filteredProducts,
        handleSearchChange
    };
}