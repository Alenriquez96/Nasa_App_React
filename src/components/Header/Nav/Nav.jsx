import React from "react";
import {Link}from "react-router-dom";

function Nav () {
    return (
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/landings">LANDINGS</Link>
        <Link to="/neas">NEAS</Link>
      </nav>
    )
  }


export default Nav;
