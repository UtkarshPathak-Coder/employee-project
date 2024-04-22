FROM node:20-alpine

WORKDIR /app

COPY . .
COPY package.json .
RUN npm i



## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["npm", "run", "dev"]