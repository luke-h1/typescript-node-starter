
# Stage 1 - build the code 
FROM node:14 as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . . 
RUN npm run build

# stage 2 - build for prod 
FROM node:14 
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production 

COPY --from=builder /usr/app/dist ./dist 



COPY .env .

EXPOSE 5000 


CMD node dist/src/index.js
