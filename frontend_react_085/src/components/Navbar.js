import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Panel de Gestión</h2>

      <Link to="/">
        <button>Gestión de empleados</button>
      </Link>

      <Link to="/productos">
        <button>Productos y servicios</button>
      </Link>
    </nav>
  );
}

export default Navbar;