import React from "react";

import Link from "next/link";

const Navbar = (props) => {
  const { title, subtitle, withBackButton } = props || {};

  return (
    <div className="doctor-list-navbar">
      <div className="doctor-list-navbar-left">
        {withBackButton && (
          <Link href="/">
            <div className="back-button">Back to Home</div>
          </Link>
        )}
        <div className="doctor-list-navbar-left-title">{title}</div>
        <div className="doctor-list-navbar-left-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

export default Navbar;
