# Build stage
FROM node:18-alpine
WORKDIR /app

# Install dependencies
RUN apk update; apk add supercronic
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

CMD ["sh", "/app/entrypoint.sh"]
