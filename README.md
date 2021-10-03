# Wulkanowy Fake Log

[![CircleCI](https://img.shields.io/circleci/project/github/wulkanowy/fake-log.svg?style=flat-square)](https://circleci.com/gh/wulkanowy/fake-log)

Fake log for the Wulkanowy app. Used for testing.

## Instalation

```bash
$ npm install
$ npm start
```

## Installation with Docker

### Docker

```bash
git clone https://github.com/wulkanowy/fake-log.git
docker build -t fake-log .
docker run -p 3000:3000 fake-log
```

### docker-compose

```bash
git clone https://github.com/wulkanowy/fake-log.git
docker-compose up
```

You can add `-d` to both `docker run` and `docker-compose up` in order to run in "detached" mode (in background)

## Nginx reverse proxy
We provide example nginx config file [fakelog.nginx](fakelog.nginx). You will need to change SSL certificates paths and domain names. You may need to change `proxy_pass` URL

## Login

- **Email**: `jan@fakelog.cf`
- **Password**: `jan123`
- **Log**: `Fakelog`
