import React from "react";
import darkCat from "../assets/images/dark-cat.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const Search = () => {
  return (
    <>
      <div className="relative flex w-full justify-center overflow-hidden">
        <div className="absolute left-4 top-4 z-10">
          <Link to={"/"}>
            <Button className="bg-white hover:bg-slate-700 hover:text-white">
              Take me back
            </Button>
          </Link>
        </div>
        <div className="right-border-radius relative flex h-[450px] w-[1500px] items-center bg-gradient-to-t from-orange-400 to-orange-300">
          <div className="relative left-20 -top-10 text-start text-7xl font-semibold">
            <div className="text-white">
              <div className="text-slate-700">Find a new friend</div>
              <div>today!</div>
            </div>
          </div>
          <img
            draggable="false"
            src={darkCat}
            alt="dark cat"
            className="relative h-[800px] w-auto scale-x-[-1]"
          />
        </div>
      </div>
      <div className="relative -top-20 flex max-w-xl">
        <SearchBar
          icon={<MagnifyingGlassCircleIcon height={"28px"} />}
          placeholder="Search Cat, Dog, Black etc."
          className="rounded-r-none"
        />
      </div>
      <div className="grid grid-cols-5 gap-8 pb-48">
        {[...Array(25)].map((e, i) => {
          return <Card key={i} />;
        })}
      </div>
    </>
  );
};

export default Search;
