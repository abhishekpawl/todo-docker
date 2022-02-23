ARG NODE_VERSION
FROM node:$NODE_VERSION
WORKDIR /app
ENV NODE_ENV production
ADD package*.json ./
RUN npm install
ADD . .
RUN npm install -g nodemon
CMD ["nodemon", "app.js"]