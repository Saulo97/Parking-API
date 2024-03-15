# API de Parking
### API para la gestión de un parking. Desarrollada con Typescript y el framework para backends de NodeJS, Express.


#### Este proyecto es la solución a una prueba técnica para una vacante como backend developer. Todos los detalles de la prueba y requerimientos los puede encontrar [aquí](https://github.com/Saulo97/Parking-API/blob/main/API-parking.pdf)


### Sobre que es el proyecto:
El API permite a los usuarios registrados como clientes, hacer una reserva de una plaza de parqueo en una fecha y hora determinada. En caso de que dicha reserva sea en un horario en el que todas las plazas de parqueo estan reservadas ya previamente, el usuario recivirá una respuesta negativa y no podrá hacer esta reserva.
También es posible crear, leer, actualizar y eliminar nuevas plazas de parqueo por parte de los usuarios que esten registrados como empleados, así como constultar en tiempo real cual es el estado de ocupación del parqueo.
Para los usuarios registrados como admin, existe la posibilidad de modificar y/o eliminar los usuarios existentes en la base de datos y además tienen la posibilidad de acceder a un registro de logs relacionados con la creacion, modificacion y eliminacion de las reservas de las plazas de parqueo.


### Que podemos ver en este proyecto:

- Trabajo con Typescript como lenguaje principal y Express como framework de backend.
- Creacion de modelos.
- Relations entre modelos.
- Trabajo con base de datos PostgresSQL y MongoDB.
- Trabajo con Sequelize y Mongoose como ORM.
- Encriptacion de contraseñas de usuario.
- Authenticacion usando JWT.
- Authorización de credenciales por roles.
- Utilizacion de express-validator para la validacion de los datos de entrada.
- Control y manejo de errores en la capa de servicios.
- Utilización de funciones asíncronas para el trabajo con la base de datos.
- Documentacion de los endpoint con swagger.
- Creación de test e2e para los principales casos de usos del proyecto.

## Empezamos:

### Requerimientos: 
- NodeJs
- NPM o YARN
- MongoDB
- PostgreSQL

### Clonar el  repositorio
Lo primero que necesitamos es clonar el repositorio.

1) Crear un nuevo directorio en su computadora local. Este va a ser el directorio 'root'.

2) Abrir la terminal dentro de la ruta de dicho directorio.

3) Ahora puede clonar el repositorio desde GitHub. Existen diferentes vias.
Si usamos HTTPS seria con el siguiente comando.
```
git clone https://github.com/Saulo97/Parking-API.git .
```


### Instalacion de los paquetes necesarios. 
En este momento ya tenemos clonado el repositorio en nuestro directorio. 
Es necesario instalar los paquetes necesarios para el funcionamiento del proyecto.
Para eso añadimos el siguiente comando en la teminal.
```
npm install
```
En caso de estar usando yarn como manejador de paquetes añadimos lo siguiente
```
yarn add
```

### Variables de entorno
Para la correcta configuración de la aplicación es necesario crear un archivo .env en el directorio raíz o 'root', donde estarán definidas las variables que necesitaremos para la configuracion de las diferentes bases de datos. Para ello rellenaremos el archivo .env con los siguientes datos. Las propiedades que aparecen entre {} son los valores que debemos reemplazar y rellenar en dependencia de nuestra configuracion. Las propiedades que tienen un valor fio y no aparecen entre {} son las propiedades por defecto.
```
PORT = {PORT}
MONGO_DB_URI = mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{PORT}/{DB_NAME} 
MONGO_DB_URI_TEST = mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{PORT}/{DB_TEST_NAME}  
USER_DB_PG = postgres
PASS_DB_PG= {PASS_DB}
NAME_DB_PG= {DB_NAME}
NAME_DB_PG_TEST= {DB_TEST_NAME}
HOST_DB_PG=localhost
PORT_DB_PORT = 5432

JWT_SECRET = {JWT_SECRET_KEY}
```

#### Preset database
Como es la primera vez que vamos a correr nuestro proyecto en nuestra computadora como local, es necesario precargar algunos datos en la base de datos para tener resultados al consultar nuestros endpoints inicialmente. Para ello escribiremos el siguiente comando en la terminal:
```
npm run prestart
```

### Test
Para asegurarnos que el API tiene un correcto funcionamiento en los endpoints mas importantes y en los casos de usos requeridos se realizaron algunos test e2e.
Para no afectar la base de datos de desarrollo, se creará automaticamente una base de datos de test, que será eliminada una vez se ejecuten los tests.
Para ejecutar los test y ver el resultado escriba el siguiente comando en la terminal:

~~~
npm run test 
~~~

### Ejecutar el proyecto 
Ahora para ejecutar el proyecto desde un entorno de desarrollo usaremos el siguiente comando:

~~~
npm run dev
~~~

### API Documentation
Para documentar esta API se usó swagger.
Esta herramienta nos brinda una interfaz gráfica donde se pueden ver los detalles de cada enpoint del API, así como sus posibles respuestas y errores.
Para acceder a la interfaz ejecutamos el proyecto con el anterior comando y accedemos a la siguiente url en el navegador:

~~~
http://localhost:3000/api-doc/
~~~
## Auth
En algunos casos hay endpoints que necesitan autorizacion.
Para ello se ha creado algunos usuarios en base dea datos para poder probar el correcto funcionamiento de estos endpoints:
***
Admin
~~~
{
    email: admin@gmail.com
    password: 123456
}
~~~
***
***
Employee
~~~
{
    email: employee@gmail.com
    password: 123456
}
~~~
***
***
Client
~~~
{
    email: client@gmail.com
    password: 123456
}
~~~
***
