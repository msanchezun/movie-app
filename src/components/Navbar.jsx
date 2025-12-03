import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../services/authContext";

const Navbar = () => {
  const { isLogged, logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* EXTREMO IZQUIERDO */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Movies Rating
        </Link>
      </div>

{/* CENTRO */}
<div className="navbar-center hidden lg:flex">

  {/* ADMIN: Categorías */}
  {role === "admin" && (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        Categorías
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li>
          <Link to="/categories" onClick={() => document.activeElement.blur()}>
            Mostrar Categorías
          </Link>
        </li>
        <li>
          <Link to="/categories/admin/create" onClick={() => document.activeElement.blur()}>
            Crear Categoría
          </Link>
        </li>
      </ul>
    </div>
  )}

  {/* ADMIN y USER: Películas */}
  {(role === "admin" || role === "user") && (
    <div className="dropdown ml-2">
      <label tabIndex={0} className="btn m-1">
        Películas
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li>
          <Link to="/movies" onClick={() => document.activeElement.blur()}>
            Mostrar Películas
          </Link>
        </li>

        {/* Crear película SOLO admin */}
        {role === "admin" && (
          <li>
            <Link to="/movies/admin/create" onClick={() => document.activeElement.blur()}>
              Crear Película
            </Link>
          </li>
        )}
      </ul>
    </div>    
  )}

  {(role === "admin" || role === "user") && (
  <div className="dropdown ml-2">
    <label tabIndex={0} className="btn m-1">
      Calificaciones
    </label>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
    >
      <li>
        <Link
          to="/ratings"
          onClick={() => document.activeElement.blur()}
        >
          Ver mis calificaciones
        </Link>
      </li>
    </ul>
  </div>
)}

</div>

      {/* EXTREMO DERECHO */}
      <div className="navbar-end">

        {/* Dropdown DaisyUI */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full flex items-center justify-center">
              <User size={22} />
            </div>
          </label>

          <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-200 rounded-box w-52"
>

  {/* INICIAR SESIÓN */}
  <li>
    {isLogged ? (
      <span className="w-full px-3 py-2 text-gray-400 cursor-not-allowed">
        Iniciar sesión
      </span>
    ) : (
      <Link
        to="/login"
        onClick={() => document.activeElement.blur()}
        className="w-full px-3 py-2"
      >
        Iniciar sesión
      </Link>
    )}
  </li>

  {/* CERRAR SESIÓN */}
  <li>
    {isLogged ? (
      <Link
        to="/"
        onClick={() => {
          logout();
          document.activeElement.blur();
        }}
        className="w-full px-3 py-2"
      >
        Cerrar sesión
      </Link>
    ) : (
      <span className="w-full px-3 py-2 text-gray-400 cursor-not-allowed">
        Cerrar sesión
      </span>
    )}
  </li>

</ul>
        </div>
      </div>

    </div>
  );
};

export default Navbar;