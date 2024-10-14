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
# Use either these
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_HOST=<your-db-host>
DB_PORT=5432
DB_DBNAME=<your-db-name-customer>
# or this
DB_URL=postgresql://<your-db-username>:<your-db-password>@<your-db-host>/<your-db-name-customer>

JWT_ACCESS_SECRET=<random_secret_1>
JWT_REFRESH_SECRET=<random_secret_2>
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

# Or build from local
docker build -t eks-demo-coffeeshop-customer:latest .


# Run the container
docker run --name eks-demo-coffeeshop-shopping
-p 4001:4000 \
-e DB_USERNAME=username \
-e DB_PASSWORD=password \
-e DB_HOST=host.docker.internal \
-e DB_PORT=5432 \
-e DB_DBNAME=database_customer \
-e JWT_ACCESS_SECRET=random_secret_1 \
-e JWT_REFRESH_SECRET=random_secret_2 \
-d eks-demo-coffeeshop-shopping:latest

# Or run using DB_URL env
docker run --name eks-demo-coffeeshop-customer
-p 4001:4000 \
-e DB_URL=postgresql://username:password@host.docker.internal:5432/database_customer \
-e JWT_ACCESS_SECRET=random_secret_1 \
-e JWT_REFRESH_SECRET=random_secret_2 \
-d eks-demo-coffeeshop-customer:latest
```
