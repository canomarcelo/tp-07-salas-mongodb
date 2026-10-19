const { crearServicioReservas } = require("./servicios/reservas");
const { leerConfiguracion } = require("./config/entorno");

const { crearApp } = require("./app");

const reservas = [
  {
    id: 1,
    estudiante: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    sala: "Sala Norte",
    fecha: "2026-10-06",
    turno: "Mañana",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "Mateo González",
    email: "mateo.gonzalez@example.com",
    sala: "Sala Sur",
    fecha: "2026-10-06",
    turno: "Tarde",
    personas: 4,
  },
  {
    id: 3,
    estudiante: "Sofía Ramírez",
    email: "sofia.ramirez@example.com",
    sala: "Sala Multimedia",
    fecha: "2026-10-07",
    turno: "Noche",
    personas: 6,
  },
  {
    id: 4,
    estudiante: "Tomás Pérez",
    email: "tomas.perez@example.com",
    sala: "Sala Norte",
    fecha: "2026-10-08",
    turno: "Mañana",
    personas: 1,
  },
];

async function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const servicioReservas = crearServicioReservas(reservas); // servicio de reservas
  const app = crearApp({ servicioReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });
}

main().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;
});
