FROM node:24-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3001
CMD [ "sh", "-c", "pnpm run migration:run && pnpm run start:prod" ]
