import { TimerContext } from "../../context";
import React, {useContext} from "react";
import styled from "styled-components";
import { encodeJsonUrl } from "../../utils/helpers";
import {Link} from "react-router-dom";

const NavLink = styled(Link)`
  padding: 5px 15px;
  margin: 10px;
  border-radius: 10px;
  color: white;
  background-color: #383838;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 100%;
  }
`;

const NavLinkContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 20px;
  list-style: none;
  display: flex;
  margin-right: 30px;
  margin-left: 30px;
  font-family: "Poppins", sans-serif;
  font-size: 1.1rem;
`;

const Nav = () => {
    const context = useContext(TimerContext);
    return (
      <nav>
        <NavLinkContainer>
          <li>
            <NavLink to={`/?timerQueue=${encodeJsonUrl(context.timerQueue)}`}>Timers</NavLink>
          </li>
          <li>
            <NavLink to="/docs">Documentation</NavLink>
          </li>
          <li>
            <NavLink to = "/add">Add</NavLink>
          </li>
          <li>
            <NavLink to = "/history">Workout History</NavLink>
          </li>
        </NavLinkContainer>
      </nav>
    );
};

export default Nav;