// backend/src/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Task.deleteMany({});
        console.log('Cleared Users and Tasks');

        // Create users
        const usersData = [
            { name: 'Alice', email: 'alice@example.com', password: 'password1' },
            { name: 'Bob', email: 'bob@example.com', password: 'password2' }
        ];

        const users = [];
        for (const u of usersData) {
            const hash = await bcrypt.hash(u.password, 10);
            const user = new User({ name: u.name, email: u.email, password: hash });
            await user.save();
            console.log(`Created user: ${user.email}`);
            users.push(user);
        }

        // Create tasks for each user
        for (const user of users) {
            for (let i = 1; i <= 4; i++) {
                const task = new Task({
                    owner: user._id,
                    title: `${user.name}'s Task ${i}`,
                    description: `This is task ${i} for ${user.name}`,
                    isComplete: i % 2 === 0,
                    dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
                    category: ['work', 'personal', 'urgent', 'other'][i % 4],
                    priority: (i % 5) + 1
                });
                await task.save();
                console.log(`Created task for ${user.email}: ${task.title}`);
            }
        }

        console.log('Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();