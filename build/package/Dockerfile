# Backend build
FROM golang:1.18 as build-backend
WORKDIR /go/src/github.com/natrongmbh/fourless
# RUN go get -d -v golang.org/x/net/html
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o fourless ./cmd/fourless

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

RUN addgroup -g 1001 -S fourless
RUN adduser -S fourless -u 1001

RUN apk --no-cache add ca-certificates
WORKDIR /app/
COPY --from=build-frontend --chown=fourless:fourless /app/out ./public
COPY --from=build-backend --chown=fourless:fourless /go/src/github.com/natrongmbh/fourless/cmd/fourless ./
EXPOSE 8000
CMD ["./fourless"]