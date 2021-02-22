[![Build Status](https://dev.azure.com/cichockiwojciech97/wojciech.cichocki/_apis/build/status/wojciech-cichocki.libp2p?branchName=issue29-init-pipeline)](https://dev.azure.com/cichockiwojciech97/wojciech.cichocki/_build/latest?definitionId=2&branchName=issue29-init-pipeline)

# libp2p

## Run project

```sh
docker-compose up
```

Client 1 is available at: http://localhost:2000

Client 2 is available at: http://localhost:3000

Client 3 is available at: http://localhost:4000

## Setup and run manually

### setup

```sh
$ cd app
$ npm install
```

```sh
$ cd signaling-server
$ npm inistall
```

### run

```sh
$ cd signaling-server/src/server
$ node index
```

```sh
$ cd app
$ npm run start
```

## Run storybook

```sh
$ cd app
$ npm run strobybook
```
