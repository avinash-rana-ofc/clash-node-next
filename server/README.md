This the backend for clash app created in Node.js

Getting Started

npm init -y

This will create package.json file
Edit package.json
Add "type" : "module" as we are going to use ECMAScript Module(ESM)

Now install 
npm i express dotenv cors

and also their types as using typescript
npm i -D typescript @types/express @types/cors nodemon

Now create tsconfig.json file in server directory and paste
{
    "compilerOptions": {
      "rootDirs": ["src"],
      "outDir": "dist",
      "lib": ["es2020"],
      "target": "es2020",
      "module": "Node16",
      "moduleResolution": "Node16",
      "esModuleInterop": true,
      "types": ["node"]
    },
    "include": ["src"]
  }

We need to now do changes in package.json
Add
"scripts": {
    "start" : "node ./dist/index.js", 
    "server" : "nodemon ./dist/index.js",
    "watch" : "tsc -w",
    "build" : "tsc"
  }

# watch: checks types and wtaches for changes
# server : first checks for dist folder for the index.js file

To run
first 
npm run watch
and
npm run server

# install prisma
npm i prisma @prisma/client

# after that initisialize prisma
npx primsa init  => This will create prisma directory and will also create db url for us in .env

# after create the user model in schema.prisma
npx prisma migrate dev --name user_table
This will create the respected tables in database

# Since before we had to npm run watch and npm run server both we can install concurrently which cna run both at same time

# run multiple commands concurrently is npm run watch-js & npm run watch-css. That's fine but it's hard to keep on track of different outputs. Also if one process fails, others still keep running and you won't even notice the difference.

npm i concurrently

# Now in package.json add in scripts 
"dev": "concurrently \"npm run watch\" \"npm run server\""

# for email we can use nodemailer
npm i nodemailer

# copy the basic template
# goto brevo in browser and open smtp & api


# install docker in system after that run command
docker run -d --name redis-server -p 6379:6379 -p 8001:8001 redis/redis-stack:latest ==> to start new redis

# this will install redis

# now install bullMq in node server
npm i bullmq

# BullMQ is a Node.js library that implements a fast and robust queue system built on top of Redis that helps in resolving many modern age micro-services architectures.

# docker commands
docker start redis-server ==> to start redis server
docker ps -a ==> list all containers