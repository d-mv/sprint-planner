FROM node:18-alpine AS app_builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./app .

ARG REACT_APP_BACKEND
ENV REACT_APP_BACKEND=$REACT_APP_BACKEND

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

EXPOSE 8000
ENV PORT=8000

COPY --from=app_builder /usr/app/build app/build
COPY --from=server_builder /usr/server/dist server/dist
COPY --from=server_builder /usr/server/package.json server/

RUN chown -R user /usr/splanner
RUN chmod -R 777 /usr/splanner

USER user

WORKDIR /usr/splanner/server
ENTRYPOINT ["npm","start"]
