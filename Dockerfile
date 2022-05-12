FROM node:17-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . ./

CMD ["npx", "ts-node", "index.ts"]
