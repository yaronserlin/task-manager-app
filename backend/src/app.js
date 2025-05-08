require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');



const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');



const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express();

// Custom token to capture response body
morgan.token('res-body', (req, res) => {
    return res.locals.body || '';
});

// Middleware to capture response body into res.locals
app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (body) {
        res.locals.body = body;
        return oldSend.call(this, body);
    };
    next();
});

// Logging HTTP requests and responses
// app.use(morgan(':method :url :status :response-time ms - :res[content-length] bytes - \nbody: :res-body\n'));
app.use(morgan('dev'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS for cross-origin requests (e.g., Hoppscotch, frontend)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: true }));



// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);


// Centralized error handler
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
}
);


// Only connect to DB and start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const MONGO_URI = process.env.MONGO_URI;

    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch(err => console.error('DB connection error:', err));
}