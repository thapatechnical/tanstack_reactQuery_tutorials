import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">ThapaReactQuery</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/rq"> FetchRQ </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
