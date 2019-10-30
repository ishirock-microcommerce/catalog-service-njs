FROM node:alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install --only=production
COPY . .
RUN npm run build && rm .dockerignore

## Build the Final Docker Image
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/
CMD ["npm","start"]