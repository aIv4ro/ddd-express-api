# Env config
## Modes
```bash
dev # used for dev server
```
```bash
prod # used for build
```

## Env file example
- Create file `mode.env` in this folder, where mode is **dev or prod**
```bash
PORT="8000" # default is 8080
MONGO_URL="YOUR_MONGO_URL" # required
JWT_PRIVATE_KEY="A_SUPER_SECRET_KEY" # required
```