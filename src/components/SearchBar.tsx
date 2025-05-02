type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex justify-center mb-812">
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 rounded-md shadow-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

export default SearchBar;
