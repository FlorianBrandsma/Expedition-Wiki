#Development
FROM node:26-alpine3.22 AS development
WORKDIR /app

COPY expedition-wiki/package*.json ./
RUN npm install

COPY expedition-wiki/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM development AS builder
WORKDIR /app
RUN npm run build

#Production
FROM nginx:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY expedition-wiki/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]