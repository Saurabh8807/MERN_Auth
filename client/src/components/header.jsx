/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
function header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="text-3xl font-bold ">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/signIn">
            <li>SignIn</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default header;
