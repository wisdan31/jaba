const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gpa: Number,
});

const Student = mongoose.model('student', studentSchema);

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(__dirname + '/index.html');
});

app.post('/addStudent', async (req, res) => {
  const { name, age, gpa } = req.body;
  const newStudent = new Student({ name, age, gpa });

  await newStudent.save()
    .then(() => res.status(201).send('Student data saved successfully'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving student data');
    });
console.log('2nd point')
  }
);


app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
