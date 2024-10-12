## EKS Demo Coffee Shop - Customer

This backend application is a part (or microservice) of an [AWS EKS demo deployment project](https://github.com/MortredN/eks-demo-coffeeshop), handling user and authentication. This app uses Express.js to run.

### Development environment setup

Clone repository and install dependencies:

```bash
git clone https://github.com/MortredN/eks-demo-coffeeshop-customer.git
cd eks-demo-coffeeshop-customer

npm install
```

Add an environment file `.env` for the development environment (Check the `.env.example` file): *Make sure the access & refresh secret on both this and [the other backend](https://github.com/MortredN/eks-demo-coffeeshop-shopping) is the same*

```properties
DB_URL=postgresql://<username>:<password>@localhost:5432/<database_customer>
JWT_ACCESS_SECRET=random_secret_1
JWT_REFRESH_SECRET=random_secret_2
```

This app uses [Drizzle ORM](https://orm.drizzle.team/docs/overview) to define and manage PostgreSQL database schemas, access data in a familiar SQL-like way. Generate and run the SQL migration files, then start the app on development:

```bash
npm run generate && npm run migrate

npm run dev
```

### Use Docker

[<img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff">](https://hub.docker.com/r/mortredn/eks-demo-coffeeshop-customer)

You can also run this app as a Docker container. Either pull from the above public repository or build your own:

```bash
# Pull image
docker pull mortredn/eks-demo-coffeeshop-customer:latest
docker tag mortredn/eks-demo-coffeeshop-customer:latest eks-demo-coffeeshop-customer:latest

# Building from local
docker build -t eks-demo-coffeeshop-customer:latest .

# Run the container
docker run --name eks-demo-coffeeshop-customer
-p 4001:4000 \
-e DB_URL=postgresql://<username>:<password>@localhost:5432/<database_customer> \
-e JWT_ACCESS_SECRET=random_secret_1 \
-e JWT_REFRESH_SECRET=random_secret_2 \
-d eks-demo-coffeeshop-customer:latest
```
