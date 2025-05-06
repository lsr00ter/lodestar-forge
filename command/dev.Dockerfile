FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# This is seperate due to cross compilation issues
RUN npm i esbuild-register --legacy-peer-deps

COPY . .

# Note: Don't expose ports here, Compose will handle that for us

CMD ["sh", "/app/entrypoint.dev.sh"]
