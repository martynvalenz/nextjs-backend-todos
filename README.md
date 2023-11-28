# Development
Steps to run this project on development mode:

1. Raise your database
```
docker-compose up -d
```
2. Install dependencies
```
npm i
```
3. Rename .env.example to .env
4. Add your database credentials to .env file
5. Run migrations
6. Run seeds
7. Run the project
```
npm run dev
```
# Prisma commands
```
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```
8. Execute seed api in Postman
```
localhost:3000/api/seed
```
* generate auth secret: https://generate-secret.vercel.app/32
# Production

# Staging