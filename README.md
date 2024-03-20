# practica-profesional-dh

Practica Profesional de Digital House

El desafio se trata de crear una API capaz de mostrar a los aspirantes registrados en una base de datos SQL y sus profesiones y redes sociales, luego mostrar los resultados en el lado del font-end con una interfaz de usuario intuitiva para los usuarios donde podran consultar toda la informacion que ofrecera la API.

Integrantes:
* Marcelo Alejandro Yufra

* Para el desafio utilizé las siguientes dependencias:

BACKEND:
* node.js: para la creacion del servidor
* express: para la creacion de la API Rest
* nodemon: para la ejecucion del servidor
* dotenv: para las variables de entorno
* morgan: para registrar las peticiones HTTP
* multer: para subir archivos
* firebase: para el almacenamiento de imagenes de usuarios
* express-validator: para las validaciones de datos
* mysql2: para la conexion a la base de datos
* sequelize: ORM para la ejecucion de consultas a la base de datos
* sequelize-cli: CLI para la ejecucion de comandos de sequelize

FRONTEND:
* vite: para la creacion de un proyecto React
* react-router-dom: para la creacion de rutas
* react-hook-form: para la creacion de formularios
* axios: para la creacion de consultas HTTP
* @fortawesome/react-fontawesome: para la utilizaion de iconos
* tailwind: para la creacion de CSS

Para descargar el proyecto y ejecutarlo se debe:
* tener instalado en el sistema XAMPP, MySQL Workbench y Visual Studio Code
* descargar el repositorio desde GitHub
* entrar a la carpeta del proyecto
* entrar a la carpeta backend y ejeutar el comando npm install
* entrar a la carpeta frontend y ejeutar el comando npm install
* dentro de la carpeta de Server/src/database/ importar el archivo recruitesDH.sql en MysQL Workbench para la creacion de la base de datos
* dentro de la carpeta de Server/src/database/ importar el archivo data.sql en MysQL Workbench para la carga de datos
* ejecutar el comando npm start dentro de la carpeta backend para ejecutar el servidor
* ejecutar el comando npm run dev dentro de la carpeta frontend para ejecutar el proyecto React
* abrir el navegador en http://localhost:5173

