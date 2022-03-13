const express = require('express');
const router = express.Router();

const Feedback = require('../../models/Feedback');

router.get('/test', (req, res) => res.send('feedback route testing!'));

router.get('/', (req, res) => {
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(404).json({nofeedbackfound: 'No Feedback Found'}));
});

router.get('/:id', (req, res) => {
    Feedback.findById(req.params.id)
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json({error: 'Unable to find this feedback'}));
});

router.post('/getCourseFeedback', (req, res) => {
    Feedback.find({course_id: req.body.course_id})
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json({error: 'Unable to find this feedback'}));
});

router.post('/getTestFeedback', (req, res) => {
    Feedback.find({test_id: req.body.test_id})
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json({error: 'Unable to find this feedback'}));
});

router.post('/', (req, res) => {
    Feedback.create(req.body)
      .then(feedback => res.json({ msg: 'Feedback added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this feedback' }));
});

router.put('/:id', (req, res) => {
    Feedback.findByIdAndUpdate(req.params.id, req.body)
        .then(feedback => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

router.delete('/:id', (req, res) => {
    Feedback.findByIdAndRemove(req.params.id, req.body)
        .then(feedback => res.json({mgs: 'test feedback deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such feedback'}));
});

module.exports = router;