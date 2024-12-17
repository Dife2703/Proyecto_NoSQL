// config/redisClient.js
const Redis = require('ioredis');

// Configura la conexión a Redis Cloud con la URL proporcionada
const redis = new Redis('redis://default:h690lV1Y7UXA7sjjP9a0SljW4rk5RqU0@redis-19811.c276.us-east-1-2.ec2.redns.redis-cloud.com:19811');

// Manejar eventos de conexión y error
redis.on('connect', () => {
  console.log('Conectado a Redis');
});

redis.on('error', (err) => {
  console.error('Error en la conexión de Redis:', err);
});

module.exports = redis;