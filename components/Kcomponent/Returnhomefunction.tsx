import Link from "next/link";
import React from "react";

const GoHome = () => {
    return (
      <div>
        <Link href="/wallet">
          <button
            className="btn btn-outline btn-error mx-7"
            onClick={() => console.log("Click")}
          >
            Add Product
          </button>
        </Link>
      </div>
    );
  };
export default GoHome;
  