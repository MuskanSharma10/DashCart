import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("signup");
  };

  return (
    <div className="navbar-container">
      <ul className="nav-ul">
        <li>
          <img
            alt="logo"
            className="logo"
            src="https://as1.ftcdn.net/v2/jpg/11/53/10/82/1000_F_1153108253_0GaFymN0TVUsyDNpL5xFsH67DMuz4SM1.jpg"
          />
        </li>

        {auth ? (
          <>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
