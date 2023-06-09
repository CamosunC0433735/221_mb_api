# 221_mb_api
The backend for a chat/message board SPA.

# First Time Setup: 
- Generate a secret key with the following the command:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` 
- Store the secret key in .env (in the local project folder)
`JWT_SECRET=[secret key]` 
