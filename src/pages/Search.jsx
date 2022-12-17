import React, { useState, useEffect, useContext } from "react";
import darkCat from "../assets/images/dark-cat.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import TokenContext from "../context/TokenContext";
import petFinderApi from "../api/pet-finder-api";
import Spinner from "../components/Spinner";

const Search = () => {
  const { token } = useContext(TokenContext);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  const fetchTypes = async () => {
    const response = await petFinderApi.get("/types", {
      headers: { Authorization: `${token.tokenType} ${token.token}` },
    });

    return response;
  };

  useEffect(() => {
    if (token) {
      fetchTypes()
        .then((res) => {
          mapOptionsToDropdown(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const fetchAnimals = (params) => {
    setIsDataLoading(true);

    const { type, attribute, attributeType } = params;

    if (params) {
      petFinderApi
        .get("/animals", {
          headers: {
            Authorization: `${token.tokenType} ${token.token}`,
          },
          params: { type: type, [attributeType]: attribute, limit: 25 },
        })
        .then((res) => {
          setData(res.data);
          setIsDataLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const mapOptionsToDropdown = (data) => {
    data?.types?.map((option) => {
      const keys = Object.keys(option);
      const values = Object.values(option);

      for (let i = 1; i < values.length - 1; i++) {
        const petType = values[0];

        values[i].map((attribute) => {
          return setOptions((prev) => [
            ...prev,
            {
              type: petType,
              attributeType: keys[i].slice(0, -1),
              attribute: attribute,
            },
          ]);
        });
      }
    });
  };

  return (
    <>
      <div className="relative flex w-full justify-center overflow-hidden">
        <div className="absolute left-4 top-4 z-10">
          <Link to={"/"}>
            <Button className="bg-white hover:bg-slate-700 hover:text-white">
              To the Home page
            </Button>
          </Link>
        </div>
        <div className="center-border-radius relative flex h-[450px] w-[1500px] items-center bg-gradient-to-t from-orange-400 to-orange-300">
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
      <div className="relative -top-20 z-10 flex max-w-xl">
        <SearchBar
          onSearch={fetchAnimals}
          options={options}
          icon={<MagnifyingGlassCircleIcon height={"28px"} />}
          placeholder="Search Cat, Dog, Black etc."
          className="rounded-r-none"
        />
      </div>
      {!data.animals ? (
        isDataLoading && <Spinner />
      ) : (
        <div className="grid grid-cols-5 gap-8 pb-48">
          {data.animals.map((animal) => {
            return <Card key={animal.id} data={animal} />;
          })}
        </div>
      )}
    </>
  );
};

export default Search;
