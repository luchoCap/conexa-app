Conexa Proyecto

Es un proyecto hecho con las siguientes tecnologias y herramientas.

- [Nest](https://github.com/nestjs/nest) (se requiere tener instalado Node)
- Typescript
- Mongoose (se requiere tener instalado node)
- prettier + eslint
- swagger

Para la construcción del proyecto se siguió las practicas de Nestjs para la creación de monorepos. https://docs.nestjs.com/cli/monorepo

Para poder ejecutar correctamente el proyecto se debe crear el archivo .env y deben configurar las variables de entorno correspondientes. Al repositorio se subió unos ejemplos de variables

## Installation

```bash
$ npm install
```

## Correr el microservicio Login

```bash
# development
$ npm run start:login

# watch mode
$ npm run start:dev:login

# production mode
$ npm run start:prod:login
```

## Correr el microservicio de Business

```bash
# development
$ npm run start:business

# watch mode
$ npm run start:dev:business

# production mode
$ npm run start:prod:business
```

## Documentacion API (swagger)

Se agregó documentación a los microservicios de Login y Business.

La dirección para ingresar a cada uno es con sus respectivas direcciones y con el endpoint '/docs'. Por ejemplo http://localhost:3000/docs

## Consideraciones

El enfoque de monorepo que tiene la documentacion de nestjs representa distintos incovenientos debido a que no restringe los microservicios entre si.
Además que pone una dificultad extra a la dockerización de los microservicios.

Nestjs proporciona una manera para usar la libreria mongoose pero tiene problemas para agregar el plugin de mongoose-paginate y de mongoose-paginate-v2. Por lo tanto tuve que aplicar otro enfoque para resolver la paginacion en la busqueda que considero que no tiene un buen rendimiento en caso de aplicarse en un proyecto real.

Los archivos de test cases no están desarrollados, es solamente la estructura que viene por defecto con nestjs.

## License

Nest is [MIT licensed](LICENSE).
