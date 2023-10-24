import Kaneinput1 from "@/components/Kcomponent/Kaneinput1";
import Link from "next/link";
import React from "react";
import Letter from "@/components/Letter";
import Buttontohome from "@/components/Kcomponent/Buttontohome";
import Productcard from "@/components/Home/ProductCard";
export default function Home() {
  return (
    <>
            <Buttontohome />
      <Letter />
      <Productcard />
    </>
  );
}
