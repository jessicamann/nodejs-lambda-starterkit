## BEGINNING BUILD IMAGE ## 
FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci

COPY . .
RUN npm run build

## BEGINNING PRODUCTION IMAGE ## 

FROM node:18.16.0-alpine
ENV NODE_ENV=production

# Fine tune permission for node user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Switch to node user before installing to ensure app + dependency files are owned by it
USER node

# Install only production dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --omit=dev

# Copy over compiled js from builder stage & set owner to node user
COPY --chown=node:node --from=builder /app/dist ./dist/

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
