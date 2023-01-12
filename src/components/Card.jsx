import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <Link to={`/pet/${data.id}`}>
      <div
        className={`card-shadow relative m-5 flex h-72 w-52 items-center justify-center overflow-hidden rounded-3xl bg-cover bg-center text-white transition duration-150 hover:rotate-2 hover:scale-110 hover:ease-in-out sm:h-96 sm:w-72 ${
          !data.primary_photo_cropped && "bg-noImage"
        }`}
        style={{
          backgroundImage:
            data.primary_photo_cropped &&
            `url('${data.primary_photo_cropped.full}')`,
        }}
      >
        <div className="flex h-full w-full flex-col justify-between p-3">
          <div className="flex items-center">
            <MapPinIcon style={{ height: "1rem" }} title="Location" />
            <div className="text-sm">{data.contact.address.city}</div>
          </div>
          <div className="content-end">
            <div className="font-bold">{data.name}</div>
            <div className="flex justify-between">
              <div>{data.age}</div>
              <div className="font-semibold uppercase">{data.gender}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
