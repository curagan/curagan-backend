FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm fetch
RUN pnpm install

COPY . ./
RUN pnpm run build

EXPOSE 4000

CMD ["pnpm", "start:prod"]