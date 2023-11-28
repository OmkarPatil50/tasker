import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TaskContext } from "../../context/TaskContextProvider";

export function Navbar() {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <h1 className="app-heading">Tasker</h1>
      <input
        className="search-bar-nav"
        type="search"
        placeholder="Search Tasks..."
        onChange={(event) => {
          navigate("/");
          dispatch({ type: "UPDATE_SEARCH_TEXT", payload: event.target.value });
        }}
      />
    </nav>
  );
}
