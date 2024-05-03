FROM node:20-alpine

WORKDIR /app

COPY . .
COPY package.json .
RUN npm i


EXPOSE 5173

CMD ["npm", "run", "dev"]