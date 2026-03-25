const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/empleados", require("./routes/empleado.routes"));
app.use("/api/productos", require("./routes/product.routes"));

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});