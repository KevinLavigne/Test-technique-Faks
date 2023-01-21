import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex justify-evenly text-2xl">
      <Link to="/" >home</Link>
      <Link to="/page1" >page1</Link>
      <Link to="/page2" >page2</Link>
      <Link to="/page3" >page3</Link>
    </div>
  )
}

export default NavBar