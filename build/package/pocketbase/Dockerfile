# Pocketbase backend build
FROM golang:1.19 as build
WORKDIR /go/src/github.com/natrongmbh/pocketbase-nextjs-template
# RUN go get -d -v golang.org/x/net/html
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o pocketbase-nextjs-template ./cmd/pocketbase-nextjs-template

# Production build
FROM alpine:3.16

WORKDIR /app

RUN addgroup -g 1001 -S pocketbase-nextjs-template
RUN adduser -S pocketbase-nextjs-template -u 1001

RUN apk --no-cache add ca-certificates

COPY --from=build --chown=pocketbase-nextjs-template:pocketbase-nextjs-template /go/src/github.com/natrongmbh/pocketbase-nextjs-template/pocketbase-nextjs-template ./

EXPOSE 8090

CMD ["./pocketbase-nextjs-template", "serve", "--http=0.0.0.0:8090"]
