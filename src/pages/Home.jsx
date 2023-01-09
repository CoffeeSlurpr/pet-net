import React, { useContext, useEffect, useState } from "react";
import puppy from "../assets/images/puppy.png";
import { Link } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import petFinderApi from "../api/pet-finder-api";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Slider from "../components/Slider";

const Home = () => {
  const { token } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);

  const fetchCats = async () => {
    return await petFinderApi.get("/animals", {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
      params: { type: "Cat", limit: 20, sort: "random" },
    });
  };

  const fetchDogs = async () => {
    return await petFinderApi.get("/animals", {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
      params: { type: "Dog", limit: 20, sort: "random" },
    });
  };

  const fetchAnimals = async () => {
    return await Promise.all([fetchCats(), fetchDogs()]);
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);

      fetchAnimals()
        .then((res) => {
          setCats(res[0].data.animals);
          setDogs(res[1].data.animals);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-center xl:flex-col">
            <div className="left-border-radius relative right-[150px] h-[600px] w-[1150px] justify-center bg-gradient-to-t from-orange-400 to-orange-300 xl:flex xl:w-full xl:items-center">
              <img
                src={puppy}
                alt="puppy"
                className="absolute right-[325px] top-[-110px] h-[800px] w-auto scale-x-[-1] xl:static xl:right-0 xl:top-0"
              />
              <div className="absolute right-[100px] top-[150px] text-center text-6xl font-semibold xl:static xl:right-0 xl:top-0">
                <div className="text-white">
                  <div className="text-slate-700">I'm looking</div>
                  <div>for a family</div>
                </div>
                <Link to="/search">
                  <Button className="bg-white hover:bg-slate-700 hover:text-white">
                    I'm wooferested
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex w-1/2 flex-col items-center justify-center py-16 text-center text-slate-700 xl:w-full">
              <div className="w-3/4 pb-3 text-5xl font-semibold">
                Our mission
              </div>
              <div className="w-3/4 text-2xl">
                <div className="text font-semiboldw-3/4">
                  Our mission is to make our pets' life meowch better!
                </div>
                <div>
                  If you are looking for company or a new family meowmber this
                  is the place you are woofing for. Browse and find your mew
                  best friend. We provide a large variety of pets to choose
                  from.
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 sm:w-1/2">
            <div className="space-y-12 pb-72">
              <div className="flex flex-col items-center space-y-4">
                <div className="space-y-1 text-center text-slate-700">
                  <div className="pb-2 text-5xl font-semibold">
                    Find a smol cuddle buddy
                  </div>
                  <div>
                    Adopting a pet comes with great responsibility. Please make
                    sure can you provide to your buddy.
                  </div>
                </div>

                <Slider items={cats} />
              </div>

              <div className="flex flex-col items-center space-y-8">
                <div className="w-1/2 space-y-2 text-center text-slate-700">
                  <div className="text-5xl font-semibold">
                    Find a loyal companion
                  </div>
                  <div>
                    Adopting a pet comes with great responsibility. Please make
                    sure can you provide to your buddy.
                  </div>
                </div>

                <Slider items={dogs} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
