# API de Parking
### API para la gestión de un parking. Desarrollada con Typescript y el framework para backends de NodeJS, Express.

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

#### windows machine
```
copy .env.template .env
```
#### mac/linux
```
cp .env.template .env
```
You can use the .env file to store API keys, secret_keys, app_passwords, db_secret_info, and you will gain access to these in the Django app.
Use the .env.template file as a reference to configure the environment variables that are required in this project.

### Email server configuration
It is necessary to configure the SMTP mail server you want to use. 
In my case I used gmail as SMTP server, in the .env.template file there are the necessary instructions to configure the mail server.
In case of errors in the operation of the mail server, it is possible to review the EmailLog on the administration site.

### Database migrations
Before starting the project, it is necessary to create a database. The project is structured to use PostgreSQL databases. 
If you need to use another database management system, you need to make extra configurations in the settings.py file to make the project work correctly.  
Remember after creating the database, create the necessary environment variables to achieve the correct connection between the database and Django.
Then let's create the database tables.
Use the following command:

~~~~
python manage.py migrate
~~~~

### Redis Database
In the case of Redis, its use in the project is related to caching and as a broker between celery and django, no additional configurations are necessary 
for its correct functioning. The Redis server simply needs to be enabled and working correctly.

To check that redis is successfully installed in our system, open redis-cli and enter ping. 
If you get PONG as output then congratulations you have successfully installed redis in your system.

### Celery
In this project, Celery is used for the execution of asynchronous tasks by the server. Especially the sending of emails is configured to be carried out through 
asynchronous tasks, which improves the performance of the API. The dependencies necessary to use celery were installed correctly if you installed the necessary 
project requirements set in the requirements.txt file.

The project does not need additional configurations regarding the use of celery, but it is important to clarify that for celery to send the processes that you
want to execute to the task queue and for them to be carried out, a celery worker must be running.
To execute a celery worker run the following command:

~~~~
celery -A core.celery worker --loglevel=info -P eventlet 
~~~~

I use eventlet to manage concurrency.

### Celery-beat
There are tasks that need to execute repeatedly after regular intervals of time like sending a push notification to every user 
on a new item's arrival on an e-commerce site. Celery beat helps us to schedule such tasks at regular intervals.

#### How celery-beat works
Celery beat creates two tables in the database, one that is responsible for storing the time intervals and another that stores the tasks to be executed, 
in the case of the latter one of its fields refers to the time intervals table and this is how a task is related to a time interval.

In this project I use celery-beat to schedule an asynchronous task that will be executed every day at 9:00 AM, this is responsible for reviewing the tasks assigned 
to developers and verifying if they reached their deadline, if so, it is emailed the project manager to notify said event.

The creation of new tasks can be handled easily from the administration site but in this case I have created a custom django command that can be executed from the terminal which is responsible for the correct configuration of this task.
It is important to clarify that to run this command it is necessary to perform the relevant migrations in the database beforehand and once it is executed it is not necessary to do this action again because the task will be configured correctly.
Run this command to configure celery-beat correctly:

~~~~
python manage.py config_periodic_task
~~~~

As in the case of celery, for this task to be executed asynchronously in the established time interval, a worker must be running.
To execute a celery-beat worker run the following command:

~~~~
celery -A core beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler 
~~~~

### Administration Site
You need a user with administrator permissions specially to access to the admin site,
you can run the following command and follow the instructions to create a superuser

~~~~
python manage.py createsuperuser
~~~~

### Test
To test the correct operation of the project, unit tests were created for models, serializers and endpoints. 
To execute these tests you simply have to execute the following command:

~~~
python manage.py test
~~~

### Run the project
Now you can run the server:

~~~
python manage.py runserver
~~~

### API Documentation
To create documentation for this API I use drf-spectacular. 
With the server running you can read this documentation using the urls created for this purpose.

~~~
api/v1/schema/swagger-ui/
~~~

~~~
api/v1/schema/redoc/
~~~


***
***
