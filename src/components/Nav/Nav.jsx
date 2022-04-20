import "./style.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

const Nav = () => {
  function setActiveLink(e) {
    document
      .querySelector("nav .nav__container .active")
      .classList.remove("active");
    e.target.closest("a").classList.add("active");
  }

  useEffect(() => {
    const targetLink = window.location.pathname.slice(1).toLowerCase();
    const targetRoute = document.querySelector(
      `.nav__container .link_${targetLink}`
    );
    if (targetLink === "" || !targetRoute) return;
    targetRoute.click();
  });
  return (
    <nav>
      <div className="container nav__container">
        <Link
          onClick={setActiveLink}
          to="/"
          className="link_home active linear-border"
        >
          <span>Home</span>
          <div className="link__icon">
            <AiOutlineHome />
          </div>
        </Link>
        <Link
          onClick={setActiveLink}
          className="link_service linear-border"
          to="/Service"
        >
          <span>Service</span>
          <div className="link__icon">
            <RiServiceLine />
          </div>
        </Link>
        <Link
          onClick={setActiveLink}
          className="link_about linear-border"
          to="/About"
        >
          <span>About</span>
          <div className="link__icon">
            <FcAbout />
          </div>
        </Link>
        <Link
          onClick={setActiveLink}
          className="link_contact linear-border"
          to="/Contact"
        >
          <span>Contact</span>
          <div className="link__icon">
            <BiMessageSquareDetail />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
