FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
COPY config.js /app/config.js
EXPOSE 3000
CMD [ "node", "app.js" ]