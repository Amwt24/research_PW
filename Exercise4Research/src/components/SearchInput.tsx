interface SearchInputProps {
    inputId: string;
    value: string;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

function SearchInput({
    inputId,
    value,
    onChange
}: SearchInputProps) {
    return (
        <div className="mb-6">
            <label
                htmlFor={inputId}
                className="block mb-2 font-medium"
            >
                Search Products
            </label>

            <input
                id={inputId}
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search by product name..."
                className="w-full border rounded-lg p-3"
            />
        </div>
    );
}

export default SearchInput;