# Build and Start

Application build is handled inside docker compose. There are two
options available - _remote_ (using remote MongoDB) and _local_
(using local MongoDB instance)

## Remote

There are several _make_ scripts available, but you can use only one:
`make build-start`. Before running it, create `.env` file with the
following content:

```env
MONGO_ADDRESS=172.20.200.2
MONGO_EXTERNAL_PORT=8082

SERVER_ADDRESS=172.20.200.3
SERVER_EXTERNAL_PORT=8081

REACT_APP_BACKEND=http://localhost:8081/api/v1/query
```

> more details about `.env` contents you can read [here](./env_files.md)