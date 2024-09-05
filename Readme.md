**Consideraciones

*Para levantar el proyecto se debe levanatar por separado backend y frontend. 

*Backend corre en http://127.0.0.1:8000 y frontend en http://localhost:3000

*Se realiza una llamada a la api la primera vez que se genera un carrito. Luego de esto se guarda la data en al base de datos y no se realizan más llamadas a al api, ya que se tiene toda la datanecesaria. 

*Para inicar el frontend se requiere docker. Se debe correr el comando: `docker-compose up --build`

*Para iniciar el backend se requiere docker. Se debe correr el comando `docker-compose up`, luego el `comando docker-compose run web python manage.py reset_db_and_populate` para resetaer la base de datos y correr miugraciones y finalmente el comando `docker-compose build` 