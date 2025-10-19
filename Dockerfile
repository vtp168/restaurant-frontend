FROM node:23.7.0-alpine3.20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 7000
CMD [ "npm", "run", "dev" ]
