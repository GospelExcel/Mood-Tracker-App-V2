const express = require('express'); // Import the Express.js library
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./db/mood_tracker.db')
const port = 3000; // You can change this port if needed
const path = require('path');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello, world!'); // This is a simple response for testing
});

// Create a table to store mood data if it doesn't exist
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS mood_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mood TEXT,
        date DATE
      )
    `);
  });


  // Route to add a new mood entry
app.post('/add-mood', (req, res) => {
    const { mood, date } = req.body;
  
    // Insert the mood entry into the database
    db.run(
      'INSERT INTO mood_entries (mood, date) VALUES (?, ?)',
      [mood, date],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error adding mood entry' });
        }
        res.status(200).json({ message: 'Mood entry added successfully' });
      }
    );
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
