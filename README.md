# API REST - Tienda Online

## Descripción

API REST desarrollada con NestJS, TypeORM y PostgreSQL para la gestión de:

- Clientes
- Categorías
- Productos
- Órdenes
- Orden-Producto

La aplicación implementa arquitectura en N-capas:

```text
Controller → Service → Repository
```

Además, incluye:

- Relaciones entre entidades con TypeORM
- Validaciones con class-validator
- Documentación interactiva con Scalar
- Manejo de errores con excepciones HTTP

---

## Tecnologías utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Swagger
- Scalar
- Class Validator

---

## Requisitos previos

Antes de ejecutar el proyecto se debe tener instalado:

- Node.js
- PostgreSQL
- npm

---

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/maurix623/api-rest-tienda-online-NestJS
```

Entrar a la carpeta del proyecto:

```bash
cd tienda-online-api
```

Instalar dependencias:

```bash
npm install @nestjs/typeorm typeorm pg
npm install class-validator
npm install class-transformer
npm install @nestjs/swagger
npm install @scalar/nestjs-api-reference
```

---

## Configuración de la base de datos

Crear una base de datos PostgreSQL:

```sql
CREATE DATABASE bd-tienda-online;
```

---

## Configuración de conexión PostgreSQL

La configuración de conexión se encuentra en:

```text
src/app.module.ts
```

Ejemplo de configuración:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'tienda_online',
  autoLoadEntities: true,
  synchronize: true,
})
```

Modificar los datos según la configuración local de PostgreSQL.

---

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```
---

## Acceso a la API

Servidor local:

```text
http://localhost:3000
```

---

## Documentación de la API

La documentación interactiva con Scalar se encuentra disponible en:

```text
http://localhost:3000/docs
```

---

## Características principales

- CRUD completo para todas las entidades
- Relaciones entre tablas usando TypeORM
- Validación automática de datos
- Manejo de errores HTTP
- Soft Delete
- Arquitectura modular
- Documentación completa de endpoints

---

## Estructura del proyecto

```text
src/
│
├── categoria/
├── cliente/
├── producto/
├── orden/
├── orden_producto/
│
├── app.module.ts
└── main.ts
```

---

---------------------------------------------
Proyecto desarrollado con NestJS y PostgreSQL.
---------------------------------------------