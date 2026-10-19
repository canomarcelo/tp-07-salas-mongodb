const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  res.locals.salas = salasPermitidas;
  res.locals.turnos = turnosPermitidos;
  next();
}

function validarReserva(req, res, next) {
  const datos = req.body ?? {};

  const estudiante = String(datos.estudiante ?? "").trim();
  const email = String(datos.email ?? "").trim();
  const sala = String(datos.sala ?? "").trim();
  const fecha = String(datos.fecha ?? "").trim();
  const turno = String(datos.turno ?? "").trim();
  const personas = Number(datos.personas);

  if (
    !estudiante ||
    !email ||
    !email.includes("@") ||
    !sala ||
    !salasPermitidas.includes(sala) ||
    !fecha ||
    !turno ||
    !turnosPermitidos.includes(turno) ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6
  ) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: "Completá todos los campos con valores permitidos.",
      valores: req.body,
      salas: salasPermitidas,
      turnos: turnosPermitidos,
    });
  }

  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };
