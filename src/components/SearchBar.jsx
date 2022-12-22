import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

const SearchBar = ({
  icon,
  inputClassName,
  buttonClassName,
  placeholder,
  options,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    const bodyClick = (event) => {
      if (searchRef.current.contains(event.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.body.addEventListener("click", bodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", bodyClick, { capture: true });
    };
  }, []);

  useEffect(() => {
    const searchBy = ["type", "attribute"];

    const filtered = options.filter((item) => {
      const lowerCaseQuery = query.toLowerCase();

      return searchBy.some((key) =>
        item[key].toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFiltered(filtered);
  }, [query, options]);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setQuery(`${option.type} - ${option.attribute}`);
    setSelected(option);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelected({});
  };

  const handleSearchClick = () => {
    if (!selected?.attribute) {
      toast.error("Please select an option from the dropdown", {
        theme: "colored",
        pauseOnHover: false,
      });
    } else {
      onSearch(selected);
    }
  };

  return (
    <div
      ref={searchRef}
      className="flex w-full gap-[3px] rounded-full bg-slate-400"
    >
      <div className="relative w-full drop-shadow-lg">
        {/* Search Input */}
        <div className="absolute mt-[10px] ml-3 h-4 text-slate-500">{icon}</div>
        <input
          onClick={() => setIsOpen(true)}
          type="text"
          placeholder={placeholder}
          onChange={handleSearchChange}
          value={query}
          autoComplete="off"
          className={`w-full rounded-full rounded-r-none border-none p-3 px-14 font-semibold text-slate-500 outline-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 ${inputClassName}`}
        />

        {/* Search Dropdown */}
        {isOpen && filtered.length > 0 && (
          <div
            className={`absolute z-10 mt-1 w-full overflow-y-auto rounded-3xl rounded-r-none border-2 border-slate-500 bg-white p-2 shadow-lg`}
          >
            <ul className="font-semibold text-slate-500">
              {filtered.map((option, index) => {
                if (index < 7) {
                  return (
                    <li
                      className="cursor-pointer rounded-full rounded-r-none p-1 px-10 hover:bg-black hover:bg-opacity-10"
                      key={index}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.type} - {option.attribute}
                      <span className="opacity-50">
                        {" | "}
                        {option.attributeType}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
      <Button
        onClick={handleSearchClick}
        className={`rounded-l-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 ${buttonClassName}`}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
