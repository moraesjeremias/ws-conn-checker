FROM node:18.19.1
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./src/main.js /app/main.js
ENTRYPOINT ["node", "main.js"]
