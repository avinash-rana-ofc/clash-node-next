import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen"
    >
      <div>
        <Image
          src="/banner_img.svg"
          width={600}
          height={600}
          alt="banner_img"
        />
      </div>
      <div className="mt-4 text-center">
        <h1
          className="bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 font-extrabold text-transparent text-6xl md:text-7xl lg:text-9xl"
        >
          Clash
        </h1>
        <p
          className="font-bold text-2xl md:text-3xl lg:text-4xl text-center"
        >
          Discover the better choice, together
        </p>
        <Link href="/login">
          <Button className="mt-2">Start free</Button>
        </Link>
      </div>
    </div>
  );
}
