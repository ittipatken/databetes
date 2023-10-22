import Link from "next/link";
import React from "react";

const GoHome = () => {
    return (
      <div>
        <Link href="/homepage">
          <button
            className="btn btn-outline btn-error mx-7"
            onClick={() => console.log("Click")}
          >
            Home
          </button>
        </Link>
      </div>
    );
  };
export default GoHome;
  