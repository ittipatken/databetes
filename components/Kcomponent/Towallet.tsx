'use client'

import Link from "next/link";
import React from "react";

const GoWallet = () => {
  return (
    <div className="flex justify-end ...">
      <Link href="/wallet">
        <button className="mx-4 my-4 block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
          <div className="flex items-center"> {/* Use flex to align elements horizontally */}
            <span>My Wallet</span> {/* Wrap "Home" in a span */}
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
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" 
              />
            </svg>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default GoWallet;