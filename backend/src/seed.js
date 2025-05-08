/**
 * Seed script
 * -----------
 * node src/seed.js   ← clears Users, Projects, Tasks and inserts demo data.
 *
 * Uses the same connection string & JWT secret the main app relies on, so
 * be sure your .env is configured (MONGO_URI, JWT_SECRET, etc.) before running.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

// ────────────────────────────────────────────────────────────────────────────

const PASSWORD = 'password123';          // easy to remember in Swagger
const SALT_ROUNDS = 10;

const usersData = [
    {
        firstName: 'Alice',
        lastName: 'Tester',
        email: 'alice@test.com',
    },
    {
        firstName: 'Bob',
        lastName: 'Debugger',
        email: 'bob@test.com',
    },
];

/** Basic task titles we’ll recycle */
const TASK_TITLES = ['Plan sprint', 'Fix bug', 'Write docs', 'Deploy release'];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🛢️  Connected to Mongo.');

    // 1⃣  PURGE
    await Promise.all([User.deleteMany(), Project.deleteMany(), Task.deleteMany()]);
    console.log('🧹  Cleared collections.');

    // 2⃣  USERS  (with hashed pw)
    const hashed = await bcrypt.hash(PASSWORD, SALT_ROUNDS);
    const users = await User.insertMany(
        usersData.map((u) => ({ ...u, password: hashed }))
    );
    console.log(`👥  Inserted ${users.length} users.`);

    // 3⃣  PROJECTS  (2 each)
    const projects = [];
    for (const user of users) {
        projects.push(
            {
                name: 'Personal',
                description: 'Life admin & errands',
                color: '#3B82F6',
                owner: user._id,
            },
            {
                name: 'Work',
                description: 'Job-related tasks',
                color: '#F59E0B',
                owner: user._id,
            }
        );
    }
    const insertedProjects = await Project.insertMany(projects);
    console.log(`📂  Inserted ${insertedProjects.length} projects.`);

    // 4⃣  TASKS  (4 per project)
    const tasks = [];
    for (const project of insertedProjects) {
        TASK_TITLES.forEach((title, i) =>
            tasks.push({
                title,
                description: `${title} for project ${project.name}`,
                completed: i % 2 === 0,          // alt: completed / not completed
                owner: project.owner,
                project: project._id,
            })
        );
    }
    const insertedTasks = await Task.insertMany(tasks);
    console.log(`✅  Inserted ${insertedTasks.length} tasks.`);

    console.log('\n🌱  Seed finished!\nDemo log-in credentials:');
    users.forEach((u) =>
        console.log(`   • ${u.email}  /  ${PASSWORD}`)
    );

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});


// // backend/src/seed.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// const Task = require('./models/Task');

// async function seed() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('Connected to MongoDB for seeding');

//         // Clear existing data
//         await User.deleteMany({});
//         await Task.deleteMany({});
//         console.log('Cleared Users and Tasks');

//         // Create users
//         const usersData = [
//             { name: 'Alice', email: 'alice@example.com', password: 'password1' },
//             { name: 'Bob', email: 'bob@example.com', password: 'password2' }
//         ];

//         const users = [];
//         for (const u of usersData) {
//             const hash = await bcrypt.hash(u.password, 10);
//             const user = new User({ name: u.name, email: u.email, password: hash });
//             await user.save();
//             console.log(`Created user: ${user.email}`);
//             users.push(user);
//         }

//         // Create tasks for each user
//         for (const user of users) {
//             for (let i = 1; i <= 4; i++) {
//                 const task = new Task({
//                     owner: user._id,
//                     title: `${user.name}'s Task ${i}`,
//                     description: `This is task ${i} for ${user.name}`,
//                     isComplete: i % 2 === 0,
//                     dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
//                     category: ['work', 'personal', 'urgent', 'other'][i % 4],
//                     priority: (i % 5) + 1
//                 });
//                 await task.save();
//                 console.log(`Created task for ${user.email}: ${task.title}`);
//             }
//         }

//         console.log('Seeding complete');
//         process.exit(0);
//     } catch (err) {
//         console.error('Seeding error:', err);
//         process.exit(1);
//     }
// }

// seed();