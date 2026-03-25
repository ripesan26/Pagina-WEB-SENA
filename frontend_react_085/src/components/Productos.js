import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productosService";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateProducto(editId, form);
      setEditId(null);
    } else {
      await createProducto(form);
    }

    setForm({ nombre: "", tipo: "", precio: "" });
    cargar();
  };

  const editar = (p) => {
    setForm(p);
    setEditId(p._id);
  };
const estilos = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};
  return (
    <div>
      <h2>Productos</h2>

      <form onSubmit={guardar} style={estilos}>
        <input placeholder="Nombre" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} />

        <input placeholder="Tipo" value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })} />

        <input placeholder="Precio" value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })} />

        <button>Guardar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.tipo}</td>
              <td>{p.precio}</td>
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

export default Productos;