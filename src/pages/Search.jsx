import React, { useState, useEffect, useContext } from "react";
import darkCat from "../assets/images/dark-cat.png";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import petFinderApi from "../api/pet-finder-api";
import TokenContext from "../context/TokenContext";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

const Search = () => {
  const { token } = useContext(TokenContext);
  const [options, setOptions] = useState([]);
  const [pets, setPets] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const fetchTypes = async () => {
    const response = await petFinderApi.get("/types", {
      headers: { Authorization: `${token.tokenType} ${token.token}` },
    });

    return response;
  };

  const fetchAnimals = async (params) => {
    const response = await petFinderApi.get("/animals", {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
      params: params,
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

  useEffect(() => {
    if (token) {
      setIsDataLoading(true);

      fetchAnimals({
        type: searchParams.type,
        [searchParams.attributeType]: searchParams.attribute,
        limit: 20,
        page: currentPage,
      })
        .then((res) => {
          setPets(res.data);
          setIsDataLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, currentPage, searchParams]);

  const mapOptionsToDropdown = (data) => {
    data.types?.map((option) => {
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
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
          onSearch={setSearchParams}
          options={options}
          icon={<MagnifyingGlassCircleIcon height={"28px"} />}
          placeholder="Search Cat, Dog, Black etc."
        />
      </div>
      {isDataLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-5 gap-8">
          {pets.animals?.map((animal) => {
            return <Card key={animal.id} data={animal} />;
          })}
        </div>
      )}
      <ReactPaginate
        containerClassName={"container"}
        activeLinkClassName={"item active"}
        nextLinkClassName={"item"}
        previousLinkClassName={"item"}
        pageLinkClassName={"item"}
        breakLabel="..."
        nextLabel="next"
        previousLabel="previous"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={!pets ? 0 : pets.pagination?.total_pages}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Search;
