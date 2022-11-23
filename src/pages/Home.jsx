import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import puppy from "../assets/images/puppy.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex w-full justify-evenly">
        <div className="custom-radius relative right-[150px] flex h-[600px] w-[1150px] bg-gradient-to-t from-orange-400 to-orange-300">
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
            <Button className="bg-white hover:bg-white hover:shadow-white">
              <Link to="/search">I'm wooferested</Link>
            </Button>
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
                If you are looking for company or a new family meowmber this is
                the place you are woofing for. Browse and find your mew best
                friend. We provide a large variety of pets to choose from.
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
              Adopting a pet comes with great responsibility. Please make sure
              can you provide to your buddy.
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="w-1/2 space-y-1 text-center text-slate-700">
            <div className="text-5xl font-semibold">Find a loyal companion</div>
            <div>
              {/* Random pet fact might go here */}
              Adopting a pet comes with great responsibility. Please make sure
              can you provide to your buddy.
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
