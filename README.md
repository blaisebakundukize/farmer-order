# farmer-order
A simple farmer ordering system

## Technologies

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Process to run this app

> To get started running the app:

1. After install the above required tools
2. Clone the app with this command: `git clone https://github.com/blaisebakundukize/farmer-order.git`
4. Create a `.env` file on the root folder of the project, then include variables as defined in the `.env.sample`
5. Run `yarn install` or `npm install` to install dependencies
6. Run `yarn/npm run start:dev` to start the app
7. Run `yarn/npm run test` to run tests

## Development standards and Guidelines

- [ESLint](https://eslint.org/) for TypeScript and JavaScript

## Swagger JSDOC

> Not yet Available

## Endpoints

### Register

- `POST /api/v1/auth/register`

```
{
    "name" : "admin",
    "email": "admin@gmail.com",
    "password": "password123",
    "phoneNumber": "0788888888",
    "roles": ["admin"]
}
```

### Login

- `POST /api/v1/auth/login`

```
{
    "email": "admin@gmail.com",
    "password": "password123"
}
```
> Endpoints require Bearer token

### Create Store

- `POST /api/v1/store`

```
{
    "storeName" : "Maize7",
    "quantity": 25,
    "type": "seed"
}
```
### Get Store by ID

- `GET /api/v1/store/:id`

### Get Stores - with queries

- `GET /api/v1/store/?limit=2&page=2&type=seed`

### Update Store

- `PATCH /api/v1/store/:id`

```
{
    "quantity": 25,
}
```

### Delete Store by ID

- `DEL /api/v1/store/:id`

### Create Order

- `POST /api/v1/order`

```
{
    "store" : "store Id",
    "landSize": 2
}
```

### Get Order by ID

- `GET /api/v1/order/:id`

### Get Orders - with queries

- `GET /api/v1/order/?limit=5&page=1&status=pending`

### Delete Order

- `DEL /api/v1/order/:id`

## Deployment

- Not Deployed

## Maintainers

- [Blaise Bakundukize](https://github.com/blaisebakundukize)
