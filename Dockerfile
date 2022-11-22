FROM node:18-alpine AS app_builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./app .

RUN npm i
RUN npm run build

FROM node:18-alpine AS server_builder

RUN mkdir -p /usr/server
WORKDIR /usr/server

COPY ./server .

RUN npm i
RUN npm run build

FROM node:18-alpine

RUN addgroup -S group && adduser -S user -G group

RUN mkdir -p /usr/splanner
WORKDIR /usr/splanner


EXPOSE 8081
ENV PORT=8081

USER user

COPY --from=app_builder /usr/app/build /app/build
COPY --from=server_builder /usr/server/dist /server/dist

WORKDIR /usr/splanner/server/dist

ENTRYPOINT ["node", "index.js"]
