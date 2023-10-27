import Link from "next/link";
import React from "react";

const ReturnHome = () => {
  return (
    <div className="flex justify-end ...">
      <Link href="/">
        <button className="mx-4 my-4 block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
          <div className="flex items-center"> {/* Use flex to align elements horizontally */}
            <span>Home</span> {/* Wrap "Home" in a span */}
            <svg
              //xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3" /* Use strokeWidth instead of stroke-width */
              stroke="currentColor"
              className="h-6 w-6 ml-2" /* Add margin to separate "Home" and icon */
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default ReturnHome;
