FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["npm", "run", "start:docker"]