const express = require('express');
const router = express.Router();

const Course = require('../../models/Course');

router.get('/test', (req, res) => res.send('course route testing!'));

router.get('/', (req, res) => {
    Course.find().sort({ $natural: -1 })
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({nocoursesfound: 'No Courses Found'}));
});

router.post('/mycourses', (req, res) => {
    Course.find({_id:req.body.ongoing_courses}).sort({ $natural: -1 })
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({nocoursesfound: 'No Courses Found'}));
});

router.post('/instructorcourses', (req, res) => {
    Course.find({intructor_id:req.body._id}).sort({ $natural: -1 })
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({nocoursesfound: 'No Courses Found'}));
});

router.post('/instructorcoursesRecent', (req, res) => {
    Course.find({intructor_id:req.body._id}).sort({ $natural: -1 }).limit(5)
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({nocoursesfound: 'No Courses Found'}));
});

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json({error: 'Unable to find this course'}));
});

router.post('/', (req, res) => {
    Course.create(req.body)
      .then(course => res.json({ msg: 'Course added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this course' }));
});

router.put('/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, req.body)
        .then(course => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

router.delete('/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, req.body)
        .then(course => res.json({mgs: 'course entry deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such course'}));
});

module.exports = router;