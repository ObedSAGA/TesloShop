# Next.js Teslo Shop

Esta aplicación es una e-ecommerce inspirtada en la tienda de Tesla Official.

Para correr en local la aplicación es necesario crear una base de datos, recomendamos usar MongoDB y Docker.

Ejecuta el siguiente comando:

```text
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__

MongoDB URL Local:

```text
MONGO_URL=//localhost:27017/teslodb
```

* Reconstruir los módulos de __Node.js__ y poner en marcha la aplicación en desarrollo.

```text
yarn install
yarnd dev
```

## Llenar la base de datos con información de pruebas

mediante una peticion GET a:

```text
http://localhost:3000/api/seed
```