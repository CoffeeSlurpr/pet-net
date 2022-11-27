import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const SearchBar = ({ icon, className, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleOptionClick = (event) => {
    setIsOpen(false);
    setSearchTerm(event.target.innerText);
  };

  return (
    <div ref={searchRef} className="flex w-full gap-[2px]">
      <div className="relative w-full drop-shadow-lg">
        <div className="absolute mt-[10px] ml-3 h-4 text-slate-500">{icon}</div>
        <input
          onClick={() => setIsOpen(true)}
          type="text"
          placeholder={placeholder}
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          autoComplete="off"
          className={`w-full rounded-full border-none p-3 px-14 font-semibold text-slate-500 outline-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 ${className}`}
        />

        {/* Search Dropdown */}
        {isOpen && (
          <div
            className={`absolute mt-1 max-h-52 w-full overflow-y-auto rounded-[2rem] rounded-r-none border-2 border-slate-500 bg-white p-2 shadow-lg`}
          >
            <ul className="font-semibold text-slate-500">
              <li
                className="cursor-pointer rounded-full rounded-r-none p-1 hover:bg-black hover:bg-opacity-10"
                onClick={(event) => {
                  handleOptionClick(event);
                }}
              >
                <div className="px-14">Hellowo</div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Button className="rounded-l-none ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
