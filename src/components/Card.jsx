import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Link to="/1">
      <div className="card-shadow flex h-72 w-52 items-center justify-center rounded-3xl bg-cat bg-cover bg-center text-white transition duration-150 hover:rotate-2 hover:scale-110 hover:ease-in-out">
        <div className="flex h-full w-full flex-col justify-between p-3">
          <div className="flex items-center">
            <MapPinIcon style={{ height: "1rem" }} title="Location" />
            <div className="text-sm">Budapest</div>
          </div>

          <div className="content-end">
            <div className="font-bold">Leila</div>
            <div className="flex justify-between">
              <div>4 years old</div>
              <div className="font-semibold uppercase">girl</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
