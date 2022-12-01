import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const SearchBar = ({ icon, className, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
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

  const handleSearchClick = (e) => {
    console.log("clicked");
  };

  const handleOptionClick = (event) => {
    setIsOpen(false);
    setQuery(event.target.innerText);
  };

  const mapOptionsToDropdown = () => {
    if (!options) return;

    const mapped = [];

    options?.types?.map((option) => {
      const arr = Object.values(option);
      for (let i = 1; i < arr.length; i++) {
        try {
          arr[i].map((element) => {
            mapped.push(`${arr[0]}-${element}`);
          });
        } catch (error) {}
      }
    });

    return mapped;
  };

  const mappedOptions = mapOptionsToDropdown();

  return (
    <div ref={searchRef} className="flex w-full gap-[2px]">
      <div className="relative w-full drop-shadow-lg">
        {/* Search Input */}
        <div className="absolute mt-[10px] ml-3 h-4 text-slate-500">{icon}</div>
        <input
          onClick={() => setIsOpen(true)}
          type="text"
          placeholder={placeholder}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          autoComplete="off"
          className={`w-full rounded-full border-none p-3 px-14 font-semibold text-slate-500 outline-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 ${className}`}
        />

        {/* Search Dropdown */}
        {isOpen && (
          <div
            className={`absolute z-10 mt-1 w-full overflow-y-auto rounded-[2rem] rounded-r-none border-2 border-slate-500 bg-white p-2 shadow-lg`}
          >
            <ul className="font-semibold text-slate-500">
              {mappedOptions.map((option, index) => {
                if (index < 10) {
                  return (
                    <li
                      className="cursor-pointer rounded-full rounded-r-none p-1 hover:bg-black hover:bg-opacity-10"
                      key={index}
                      onClick={(event) => {
                        handleOptionClick(event);
                      }}
                    >
                      <div className="px-10">{option}</div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
      <Button
        onClick={(e) => handleSearchClick(e)}
        className="rounded-l-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
