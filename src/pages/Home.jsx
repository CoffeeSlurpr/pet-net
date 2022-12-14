import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import puppy from "../assets/images/puppy.png";
import { Link } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import petFinderApi from "../api/pet-finder-api";
import Spinner from "../components/Spinner";

const Home = () => {
  const { token } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchCats = petFinderApi.get("/animals", {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
      params: { sort: "recent", type: "Cat", limit: 5 },
    });

    const fetchDogs = petFinderApi.get("/animals", {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
      params: { sort: "recent", type: "Dog", limit: 5 },
    });

    if (token && Object.keys(token).length !== 0) {
      Promise.all([fetchCats, fetchDogs])
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
          <div className="flex w-full justify-evenly">
            <div className="left-border-radius relative right-[150px] flex h-[600px] w-[1150px] bg-gradient-to-t from-orange-400 to-orange-300">
              <img
                src={puppy}
                alt="puppy"
                className="absolute right-[325px] top-[-110px] h-[800px] w-auto scale-x-[-1]"
              />
              <div className="absolute right-[100px] top-[150px] text-center text-6xl font-semibold">
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

            <div className="flex w-1/2 flex-col justify-center  text-center text-slate-700">
              <div className="w-3/4">
                <div className="pb-3 text-5xl font-semibold">Our mission</div>
                <div className="text-2xl">
                  <div className="text font-semibold">
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
          </div>

          <div className="space-y-12 pb-72">
            <div className="flex flex-col items-center space-y-8">
              <div className="w-1/2 space-y-1 text-center text-slate-700">
                <div className="text-5xl font-semibold">
                  Find a smol cuddle buddy
                </div>
                <div>
                  Adopting a pet comes with great responsibility. Please make
                  sure can you provide to your buddy.
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                {cats.map((cat) => {
                  return <Card data={cat} key={cat.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <div className="w-1/2 space-y-2 text-center text-slate-700">
                <div className="text-5xl font-semibold">
                  Find a loyal companion
                </div>
                <div>
                  {/* Random pet fact might go here */}
                  Adopting a pet comes with great responsibility. Please make
                  sure can you provide to your buddy.
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                {dogs.map((dog) => {
                  return <Card data={dog} key={dog.id} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
