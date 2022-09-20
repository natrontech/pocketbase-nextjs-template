# Backend build
FROM golang:1.19 as build-backend
WORKDIR /go/src/github.com/natrongmbh/pocketbase-nextjs-template
# RUN go get -d -v golang.org/x/net/html
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o pocketbase-nextjs-template ./cmd/pocketbase-nextjs-template

# Frontend build
# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./web/app/package.json ./web/app/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS build-frontend

WORKDIR /app
COPY ./web/app .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production build
FROM alpine:latest

WORKDIR /app

RUN addgroup -g 1001 -S pocketbase-nextjs-template
RUN adduser -S pocketbase-nextjs-template -u 1001

RUN apk --no-cache add ca-certificates

COPY --from=build-frontend --chown=pocketbase-nextjs-template:pocketbase-nextjs-template /app/out ./web
COPY --from=build-backend --chown=pocketbase-nextjs-template:pocketbase-nextjs-template /go/src/github.com/natrongmbh/pocketbase-nextjs-template/pocketbase-nextjs-template ./

EXPOSE 8090

CMD ["./pocketbase-nextjs-template", "serve", "--http=0.0.0.0:8090"]
