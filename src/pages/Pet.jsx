import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import petFinderApi from "../api/pet-finder-api";
import { AtSymbolIcon, PhoneIcon, HomeIcon } from "@heroicons/react/24/solid";
import Spinner from "../components/Spinner";
import TokenContext from "../context/TokenContext";
import Button from "../components/Button";
import noImage from "../assets/images/no-image.jpg";
import { decode } from "html-entities";

const Pet = () => {
  const { id } = useParams();
  const { token } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pet, setPet] = useState({});
  const navigate = useNavigate();

  const fetchAnimal = async () => {
    const response = await petFinderApi.get(`/animals/${id}`, {
      headers: {
        Authorization: `${token.tokenType} ${token.token}`,
      },
    });

    return response;
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);

      fetchAnimal()
        .then((res) => {
          setPet(res.data.animal);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const displayBreedCheck = () => {
    if (pet.breeds.mixed === true) {
      return <p>{pet.breeds.primary} mix</p>;
    }

    if (pet.breeds.mixed === true && pet.breeds.primary === null) {
      return <p>mixed</p>;
    }

    if (pet.breeds.unknown === true) {
      return <p>unknown</p>;
    }

    if (pet.breeds.secondary !== null) {
      return (
        <p>
          {pet.breeds.primary} - {pet.breeds.secondary} - mix
        </p>
      );
    }

    return <p>{pet.breeds.primary}</p>;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="absolute left-4 top-4 z-10">
            <Button
              className="bg-white hover:bg-slate-700 hover:text-white"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
          <div className="right-border-radius relative my-4 flex h-[380px] w-[1200px] items-center justify-center gap-20 bg-gradient-to-t from-orange-400 to-orange-300 md:flex-col md:gap-10">
            <img
              src={
                pet.primary_photo_cropped
                  ? pet.primary_photo_cropped.full
                  : noImage
              }
              alt="petpic"
              className="relative top-8 aspect-square w-96 rounded-full object-cover lg:w-72"
            />

            <div className="top-1/3 left-36 text-6xl font-semibold text-slate-700 lg:text-5xl">
              Meet <span className="text-white">{pet.name}</span>
            </div>
          </div>

          <div className="mt-10 w-1/2 space-y-4 pb-72 text-slate-700 xl:flex xl:w-full xl:flex-col xl:items-center xl:gap-4">
            <div className="float-right mb-10 w-fit min-w-[350px] space-y-4 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-300 p-4 text-center text-slate-700">
              <div className="text-4xl font-semibold">Contact</div>
              <div className="flex flex-col items-center justify-center space-y-2">
                {pet.contact.email !== null && (
                  <div className="flex gap-4">
                    <AtSymbolIcon height={"28px"} />
                    <div>{pet.contact.email}</div>
                  </div>
                )}

                {pet.contact.phone !== null && (
                  <div className="flex gap-4">
                    <PhoneIcon height={"28px"} /> <div>{pet.contact.phone}</div>
                  </div>
                )}

                {pet.contact.address.city !== null && (
                  <div className="flex gap-4">
                    <HomeIcon height={"28px"} />
                    <div>
                      {pet.contact.address.postcode}
                      {", "}
                      {pet.contact.address.city}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-3xl font-semibold">Or</div>
              <div>
                <a href={pet.url} target="_blank" rel="noreferrer">
                  <Button>Find me on Petfinder</Button>
                </a>
              </div>
            </div>

            <div className="space-y-2 p-5">
              <div className="text-5xl font-semibold">About</div>
              {pet.breeds && (
                <div>
                  <p className="text-2xl font-semibold">Breed</p>
                  <div className="text-lg">{displayBreedCheck()}</div>
                </div>
              )}
              {pet.colors.primary && (
                <div>
                  <p className="text-2xl font-semibold">Color</p>
                  <p className="text-lg">{pet.colors.primary}</p>
                </div>
              )}
              {pet.gender && (
                <div>
                  <p className="text-2xl font-semibold">Gender</p>
                  <p className="text-lg">{pet.gender}</p>
                </div>
              )}
              {pet.size && (
                <div>
                  <p className="text-2xl font-semibold">Size</p>
                  <p className="text-lg">{pet.size}</p>
                </div>
              )}
              {pet.status && (
                <div>
                  <p className="text-2xl font-semibold">Status</p>
                  <p className="text-lg">{pet.status}</p>
                </div>
              )}
              {pet.description && (
                <div>
                  <p className="text-2xl font-semibold">Description</p>
                  <p className="text-lg">{decode(pet.description)}</p>
                </div>
              )}
              {pet.tags.length > 0 && (
                <div>
                  <p className="text-2xl font-semibold">Other attributes</p>
                  <p className="text-lg">
                    {pet.tags.map((attr, index) => {
                      return (
                        <span key={index}>
                          {attr}
                          {index + 1 !== pet.tags.length ? " - " : ""}
                        </span>
                      );
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pet;
