const mongoose = require('mongoose');
const http = require('http');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Express app

let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.disconnect();
    await mongoose.connect(uri);

    // Start the HTTP server for Supertest
    server = http.createServer(app).listen();
});

afterAll(async () => {
    // Close server and database connections
    await server.close();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

module.exports = server;