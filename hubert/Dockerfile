FROM node:18-alpine
WORKDIR /usr/src/nestjs
COPY . .
RUN npm i
RUN npm run build
CMD ["npm", "run", "start:all"]