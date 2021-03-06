const express = require('express');
const router = express.Router();

const Test = require('../../models/Test');

router.get('/test', (req, res) => res.send('test route testing!'));

router.get('/', (req, res) => {
    Test.find()
        .then(tests => res.json(tests))
        .catch(err => res.status(404).json({nocoursesfound: 'No Tests Found'}));
});

router.get('/:id', (req, res) => {
    Test.findById(req.params.id)
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find this test'}));
});

router.post('/myTests', (req, res) => {
    Test.find({creator_id: req.body.creator_id}).sort({ $natural: -1 })
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find this test'}));
});

router.post('/myTestsRecent', (req, res) => {
    Test.find({creator_id: req.body.creator_id}).sort({ $natural: -1 }).limit(5)
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find this test'}));
});

router.post('/myPendingTestsRecent', (req, res) => {
    Test.find({creator_id: req.body.creator_id, $expr:{$lt:[{$size:"$tester_id"},2]}}).sort({ $natural: -1 }).limit(5)
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find this test'}));
});

router.post('/courseTests', (req, res) => {
    Test.find({course_id: req.body.course_id})
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find this test'}));
});

router.post('/getCourseTestCount', (req, res) => {
    Test.count({course_id: req.body.course_id})
        .then(test => res.json(test))
        .catch(err => res.status(400).json({error: 'Unable to find count for course'}));
})

router.post('/', (req, res) => {
    Test.create(req.body)
      .then(test => res.json({ msg: 'Test added successfully', data: test}))
      .catch(err => res.status(400).json({ error: 'Unable to add this test' }));
});

router.put('/:id', (req, res) => {
    Test.findByIdAndUpdate(req.params.id, req.body)
        .then(test => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

router.delete('/:id', (req, res) => {
    Test.findByIdAndRemove(req.params.id, req.body)
        .then(test => res.json({mgs: 'test entry deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such test'}));
});

module.exports = router;