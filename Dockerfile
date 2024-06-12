FROM node:21-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN cd packages/cli/ && npm install -g

ENTRYPOINT [ "osc" ]