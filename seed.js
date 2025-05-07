require('dotenv').config();
const mongoose = require('mongoose');
const Activity = require('./src/models/Activity'); // Adjust the path as necessary

const activities = [
  {
    title: 'Cricket Match',
    description: 'Weekend cricket tournament',
    location: 'Central Park',
    dateTime: new Date('2023-06-15T10:00:00')
  },
  {
    title: 'Movie Night',
    description: 'Open air movie screening',
    location: 'City Square',
    dateTime: new Date('2023-06-20T19:00:00')
  },
  {
    title: 'Football Game',
    description: 'Friendly 5-a-side match',
    location: 'Sports Complex',
    dateTime: new Date('2023-06-18T15:00:00')
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Activity.deleteMany();
    console.log('Cleared existing activities...');
    
    await Activity.insertMany(activities);
    console.log('Database seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();