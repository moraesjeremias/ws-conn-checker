FROM node:18.19.1
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./src/*.js /app/
ENTRYPOINT ["node", "main.js"]
