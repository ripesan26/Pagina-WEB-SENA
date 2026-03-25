import { useEffect, useState } from "react";
import {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../services/empleadosService";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    cargo: "",
    salario: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateEmpleado(editId, form);
      setEditId(null);
    } else {
      await createEmpleado(form);
    }

    setForm({ nombre: "", correo: "", cargo: "", salario: "" });
    cargar();
  };

  const editar = (emp) => {
    setForm(emp);
    setEditId(emp._id);
  };

  const estilos = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};
  return (
    <div>
      <h2>Empleados</h2>

      <form onSubmit={guardar} style={estilos}>
        <input placeholder="Nombre" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} />

        <input placeholder="Correo" value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })} />

        <input placeholder="Cargo" value={form.cargo}
          onChange={(e) => setForm({ ...form, cargo: e.target.value })} />

        <input placeholder="Salario" value={form.salario}
          onChange={(e) => setForm({ ...form, salario: e.target.value })} />

        <button>Guardar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Cargo</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((e) => (
            <tr key={e._id}>
              <td>{e.nombre}</td>
              <td>{e.correo}</td>
              <td>{e.cargo}</td>
              <td>{e.salario}</td>
              <td>
  <button style={{ marginRight: "10px" }} onClick={() => editar(e)}>
    Editar
  </button>
  <button onClick={() => deleteEmpleado(e._id).then(cargar)}>
    Eliminar
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empleados;