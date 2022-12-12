import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import petFinderApi from "../api/pet-finder-api";
import Spinner from "../components/Spinner";
import TokenContext from "../context/TokenContext";

const Pet = () => {
  const { id } = useParams();
  const { token } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pet, setPet] = useState({});

  //FIXME token isn't immediately available on render

  useEffect(() => {
    setIsLoading(true);

    if (token && Object.keys(token).length !== 0) {
      //temporary fix for fix
      petFinderApi
        .get(`/animals/${id}`, {
          headers: {
            Authorization: `${token.tokenType} ${token.token}`,
          },
        })
        .then((res) => {
          setPet(res.data.animal);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <>
      {isLoading && token ? (
        <div className="flex h-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="right-border-radius relative my-4 flex h-[380px] w-[1200px] items-center justify-center gap-20 bg-gradient-to-t from-orange-400 to-orange-300">
            <img
              src={pet.primary_photo_cropped.full}
              alt="petpic"
              className="relative top-8 aspect-square w-96 rounded-full object-cover"
            />

            <div className="top-1/3 left-36 text-6xl font-semibold text-slate-700">
              Meet <span className="text-white">{pet.name}</span>
            </div>
          </div>

          <div className="mt-10 w-1/2">
            <div className="text-5xl font-semibold text-slate-700">About</div>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,
              rem adipisci debitis iusto doloremque voluptatibus fuga, animi
              eveniet iure nihil et, soluta beatae error praesentium distinctio
              quisquam veritatis expedita nisi! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Dignissimos, harum, molestiae
              dolorem odio corrupti provident illo deleniti cumque ullam totam
              qui tempore. Atque ipsum hic ab delectus distinctio adipisci
              minima!
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pet;
