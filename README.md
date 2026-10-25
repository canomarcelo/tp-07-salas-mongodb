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
 comandos:
 Comprobacion de de conexion: npm run comprobardb
 Listar reservas: npm run listar
 Crear reserva: npm run crear 
 validar reserva: npm run validar
 formato: npm run format
 comprobacion de formato: npm run format:check
 linter: npm run lint
 arranque de la app : npm start

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
Caso                             Resultado esperado                      Resultado Observado
--------------------------------------------------------------------------------------------------------------------------------------------
Conexión válida                  Confirmación y proceso terminado      | -> Conexión con MongoDB establecida. -> conexion con MongoDB cerrada.
---------------------------------------------------------------------------------------------------------------------------------------------
Fallo DNS, si ocurrió            Registrar código/operación y solución |  NO coucrrio errores al comprobar la conecion. se comento la linea 
                                 autorizada; repetir conexión          |  dns.setServers(["8.8.8.8", "1.1.1.1"]); se comprobo la conexion sin errore
----------------------------------------------------------------------------------------------------------------------------------------------
Variable vacía                   Fallo de configuración; sin mensaje de| MONGODB_URI="" resultado -> conexion con MongoDB cerrada. no se pudo completar
                                 éxito                                 | la conexión: Error Revisar MONGODB_URI, servidor, red y    permisos.
----------------------------------------------------------------------------------------------------------------------------------------------
Contraseña incorrecta temporal   Fallo de autenticación; sin crear     | contraseña incorrecta -> conexion con MongoDB cerrada. no se pudo completa
en el .env privado               documentos                            | la conexión: Error Revisar MONGODB_URI, servidor, red y    permisos.
----------------------------------------------------------------------------------------------------------------------------------------------
Colección vacía, si se dispone   Listado de cantidad 0, sin error      | ┌─────────┐
de una base nueva                                                      | │ (index) │
                                                                       | ├─────────┤
                                                                       | └─────────┘
                                                                       |  Total de reservas: 0
                                                                       |  conexion con MongoDB cerrada.
----------------------------------------------------------------------------------------------------------------------------------------------
Reserva válida                    | Se guarda y devuelve _id           | Reserva guardada. _id: 6ade66e4fc1f07e363a432eb
                                  |                                    | conexion con MongoDB cerrada.
estudiante:"Mateo González",      |                                    |
email:"mateo.gonzalez@example.com"|                                    |
sala: "Sala Sur",                 |                                    |
fecha: "2026-10-06",              |                                    |
turno: "Tarde",                   |                                    |
personas: 4,                      |                                    |
----------------------------------------------------------------------------------------------------------------------------------------------
Consulta desde proceso nuevo      | Recupera ese _id                   | id = '6ade66e4fc1f07e363a432eb'
----------------------------------------------------------------------------------------------------------------------------------------------
Segunda consulta                  | No agrega registros                |
┌─────────┬────────────────────────────┬──────────────────┬──────────────────────────────┬────────────┬──────────────┬─────────┬──────────┐
│ (index) │ id                         │ estudiante       │ email                        │ sala       │ fecha        │ turno   │ personas │
├─────────┼────────────────────────────┼──────────────────┼──────────────────────────────┼────────────┼──────────────┼─────────┼──────────┤
│ 0       │ '6ade66e4fc1f07e363a432eb' │ 'Mateo González' │ 'mateo.gonzalez@example.com' │ 'Sala Sur' │ '2026-10-06' │ 'Tarde' │ 4        │
└─────────┴────────────────────────────┴──────────────────┴──────────────────────────────┴────────────┴──────────────┴─────────┴──────────┘
-----------------------------------------------------------------------------------------------------------------------------------------------
Estudiante vacío                       |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "",                        |                               | Campos a revisar: estudiante
email: "lucia.fernandez@example.com",  |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Norte",                    |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 2                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------
Email sin @                            |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Norte",                    |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 2                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------
Sala o turno no permitido              |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email, sala
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala OESTE",                    |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 2                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------
Fecha vacía                            |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email, fecha
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Sur",                      |                               |
fecha: "",                             |                               |
turno: "Mañana",                       |                               |
personas: 2                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------
Personas 0                             |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email, personas
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Sur",                      |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 0                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------
Personas 7                             |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email, personas
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Sur",                      |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 7                            |                               |
-----------------------------------------------------------------------------------------------------------------------------------------------  
Personas 2.5                           |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
                                       |                               | No se pudo crear la reserva: ValidationError  
estudiante: "Lucía Fernández",         |                               | Campos a revisar: email, personas
email: "lucia.fernandezexample.com",   |                               | Revisar datos, configuración y disponibilidad de MongoDB.
sala: "Sala Sur",                      |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: 2.5                          |                               |
----------------------------------------------------------------------------------------------------------------------------------------------- 
Personas con texto no numérico Rechazo |Rechazo, cantidad sin cambios  | conexion con MongoDB cerrada.
de conversión, sin escritura           |                               | No se pudo crear la reserva: ReferenceError
                                       |                               | Revisar datos, configuración y disponibilidad de MongoDB.
estudiante: "Lucía Fernández",         |                               | 
email: "lucia.fernandezexample.com",   |                               | 
sala: "Sala Sur",                      |                               |
fecha: "2026-10-06",                   |                               |
turno: "Mañana",                       |                               |
personas: dos                          |                               |
----------------------------------------------------------------------------------------------------------------------------------------------- 
# 8. Explicación de por qué el sitio continúa en memoria y qué se abordará en la unidad 8.
Todabia las rutas web estan operando en memoria, en la unidad 8 abordaremos como hacer que las rutas 
guarden la informacion en la base de datos que esta online.
# 9. Confirmación de que no se publican .env, credenciales ni datos personales.
el .env no se publica poque esta en la lista en el archivo .gitingnore

