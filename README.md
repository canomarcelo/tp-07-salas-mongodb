# tp-07-salas-mongodb

# 1. Punto de partida y nombre de la copia.
Se realizo una copia del trabajo practico tp-06-salas-modular, sin node_module
.git y .env

# 2. Versiones utilizadas y confirmación del uso de Atlas Free (M0).
npm --version -> 11.17.0
node --version -> v24.19.0
npm list mongoose -> mongoose@9.11.2

# 3. Pasos desde una descarga nueva: instalar dependencias, preparar el clúster gratuito, usuario e IP permitida, copiar la plantilla de entorno y ejecutar.
comandos para la instalacion
    a) npm install
    b) npm install mongoose

# 4. Diagnóstico DNS y resolutores usados, si hubo ajustes; comandos exactos de conexión, creación, listado,
# calidad y arranque web.

# 5. Mapa de archivos y explicación de esquema, modelo y colección.
Se traslado las funciones del archivo configuracion.js a config/entorno.js
ademas de agregar en dicho archivo una nueva funcion "leerUriMongo".
se creo la carpeta scripts donde se crearon archivos con diferentes funcionalidades, crear-reserva,js
crea una reserva en la base de datos.
listar-reserva.js muestra por consola todas las reservas que estan en la base de datos.
validar-reserva.js se utilizar para verificar que los datos a guardar en la base de datos sean correcto tengan el formato correspondiente.

# 6. Campos y reglas, incluyendo límites que todavía no se controlan.
estudiante: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: /@/ },
    sala: { type: String, required: true, enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"], },
    fecha: { type: String, required: true, trim: true },
    turno: { type: String, required: true, enum: ["Mañana", "Tarde", "Noche"] },
    personas: { type: Number, required: true, min: 1, max: 6,
      validate: {
        validator: Number.isInteger,
        message: "El número de personas debe ser un número entero.",
      },
    }
# 7. Matriz de pruebas con resultados y evidencia de persistencia entre procesos.

# 8. Explicación de por qué el sitio continúa en memoria y qué se abordará en la unidad 8.

# 9. Confirmación de que no se publican .env, credenciales ni datos personales.

