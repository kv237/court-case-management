import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  onFilter,
}) => {
  return (
    <div
  className="
    flex items-center gap-2
    transition-all duration-300
  "
>
      {/* SEARCH INPUT */}

      <div
        className="
        flex-1
        bg-white
        dark:bg-zinc-900
        rounded-2xl
        border border-gray-200
        dark:border-zinc-800
        px-4 py-3
        flex items-center gap-3
        shadow-sm"
      >
        <Search
          size={18}
          className="
          text-gray-500
          shrink-0"
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search documents..."
          className="
          bg-transparent
          outline-none
          w-full
          text-[13px]
          font-medium
          text-black
          dark:text-white
          placeholder:text-gray-400"
        />
      </div>

      {/* FILTER BUTTON */}

      <button
        onClick={onFilter}
        className="
        w-12 h-12
        rounded-2xl
        bg-blue-600
        text-white
        flex items-center justify-center
        shadow-md
        active:scale-95
        transition-all"
      >
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
};

export default SearchBar;