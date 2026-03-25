import { useState } from "react";
import Empleados from "./components/Empleados";
import Productos from "./components/Productos";
import "./App.css";

function App() {
  const [vista, setVista] = useState("empleados");

  return (
    <div className="container">
      <h1>Sistema de Gestión</h1>

      <div className="tabs">
        <button onClick={() => setVista("empleados")}>
          Usuarios
        </button>
        <button onClick={() => setVista("productos")}>
          Productos / Servicios
        </button>
      </div>

      {vista === "empleados" ? <Empleados /> : <Productos />}
    </div>
  );
}

export default App;