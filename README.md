### What does this app do?
This is a simple implementation of a rate limiter using redis. The app has 1 endpoint: `/`. This endpoint is rate limited to 5 requests per minute. If the user exceeds the limit, the app will return a 429 status code and a header specifying the time when the user can make another request.
Each user is identified by their IP address.

### Installation
1. Create a redis instance in docker
```bash
docker run --name redis_rl -p 6380:6379 -d redis
```
2. Install the requirements
```bash
npm install
```
3. Run the app
```bash
npm run start:dev
```
4. The app will be running on port 3000
