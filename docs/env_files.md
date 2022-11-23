# .env Files

There are two `.env` files are considered - `.env`
and `.env.local`. This is for two ways of using the
app - _remote_ (`.env`) and _local_ (`.env.local`).
As you are going to see the difference is only minor.

## .env

```env
MONGO_ADDRESS=172.20.200.2
MONGO_EXTERNAL_PORT=8082

SERVER_ADDRESS=172.20.200.3
SERVER_EXTERNAL_PORT=8081

REACT_APP_BACKEND=http://localhost:8081/api/v1/query
```
where:

- `SERVER_ADDRESS` - server address in the internal docker
network
- `SERVER_EXTERNAL_PORT` - port on local machine to which
server is going to be linked
- `REACT_APP_BACKEND` - path to backend for the React app
(will be embedded during the build stage)

## .env.local