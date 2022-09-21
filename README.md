<p align="center">
    <a href="https://github.com/natrongmbh/pocketbase-nextjs-template">
        <img height="120px" src="./assets/pocketbase-nextjs-template-logo.png" />
    </a>
    <h1 align="center">
        PocketBase Next.js Template
    </h1>
    <p align="center">
    <a href="https://pocketbase.io/">
        <img height="60px" src="https://pocketbase.io/images/logo.svg" />
    </a>
    <a href="https://nextjs.org/">
        <img height="60px" src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" />
    </a>
    </p>
</p>

<p align="center">
  <strong>
    A <br />
    <a href="https://github.com/natrongmbh/pocketbase-nextjs-template">Template Repository</a>
    <br />
    for <a href="https://nextjs.org">Next.js</a> apps with a <a href="https://pocketbase.io">PocketBase</a> backend
  </strong>
</p>

<p align="center">
  <a href="https://github.com/natrongmbh/pocketbase-nextjs-template/issues"><img
    src="https://img.shields.io/github/issues/natrongmbh/pocketbase-nextjs-template"
    alt="Build"
  /></a>
  <a href="https://github.com/sponsors/janlauber"><img
    src="https://img.shields.io/github/sponsors/janlauber"
    alt="Sponsors"
  /></a>
  <a href="https://github.com/natrongmbh/pocketbase-nextjs-template"><img
    src="https://img.shields.io/github/license/natrongmbh/pocketbase-nextjs-template"
    alt="License"
  /></a>
  <a href="https://www.codefactor.io/repository/github/natrongmbh/pocketbase-nextjs-template"><img
    src="https://www.codefactor.io/repository/github/natrongmbh/pocketbase-nextjs-template/badge"
    alt="CodeFactor"
  /></a>
</p>

<p align="center">
  pocketbase-nextjs-template allowes you to create and manage trial deployments of your application.
</p>

<p align="center">
  <em>
    Check out the company behind pocketbase-nextjs-template –
    <a
      href="https://natron.io/"
    >https://natron.io</a>
  </em>
</p>

<h2></h2>
<p>&nbsp;</p>

## Everything you would expect

### Getting started

Search through all files/folders and replace all instances of `pocketbase-nextjs-template` with your project name.

### Open Source

Trust me, I'm open source.
You can find the source code on [Github](https://github.com/natrongmbh/pocketbase-nextjs-template).
The frontend is written in Next.js and the backend in GoLang.
License: GPL 3

### Frontend

The frontend is written in TypeScript and uses Next.js.  
It uses [Tailwind CSS](https://tailwindcss.com/) for styling with [Flowbite React](https://flowbite-react.com) as a design system.  

<h2></h2>
<p>&nbsp;</p>

## Setup

You can deploy pocketbase-nextjs-template in your Kubernetes cluster, but you have to set all the env variables.

- [kubernetes-example](/deployments/kubernetes)

### Repository

You need to set the following Github Actions secrets:

- `ENV_API_URL` - The URL of the API, e.g. `https://template.natron.io/api` (without trailing slash, but /api at the end, must be accessible from the webclient)

### Docker

You can also build and run pocketbase-nextjs-template with Docker.

```yaml
version: "3.9"
services:
  app:
    build: 
      context: ./
      dockerfile: ./build/package/Dockerfile
      args:
        - ENV_API_URL=http://template.natron.io/api
    ports:
      - "8090:8090"
    volumes:
      - data:/data

volumes:
  data: {}
```
