const express = require('express');
const router = express.Router();

const Report = require('../../models/Report');

router.get('/test', (req, res) => res.send('Report route testing!'));

router.get('/', (req, res) => {
    Report.find()
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({noreportsfound: 'No Reports Found'}));
});

router.get('/:id', (req, res) => {
    Report.findById(req.params.id)
        .then(report => res.json(report))
        .catch(err => res.status(400).json({error: 'Unable to find this report'}));
});

router.post('/getReportID', (req, res) => {
    Report.find({student_id: req.body.student_id, course_id: req.body.course_id})
        .then(report => res.json(report))
        .catch(err => res.status(400).json({error: 'Unable to find this report'}));
});

router.post('/isRegistered', (req, res) => {
    Report.count({student_id: req.body.student_id, course_id: req.body.course_id})
        .then(report => {
            if(report > 0){
                res.json(true)
            }else{
                res.json(false)
            }
        })
        .catch(err => res.status(400).json({error: 'Unable to find this report'}));
});

router.post('/registeredReportsRecent', (req, res) => {
    Report.find({student_id: req.body.student_id}).sort({ $natural: -1 }).limit(5)
        .then(report => res.json(report))
        .catch(err => res.status(400).json({error: 'Unable to find this report'}));
});

router.post('/studentTestReports', (req, res) => {
    Report.find({tests_taken: {$elemMatch: {test_id: req.body.test_id}}}).sort({ $natural: -1 })
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({error: 'No Reports Found'}));
});

router.post('/studentTestReportsCount', (req, res) => {
    Report.count({tests_taken: {$elemMatch: {test_id: req.body.test_id}}})
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({error: 'No Reports Found'}));
});

router.post('/getCourseStudents', (req, res) => {
    Report.find({course_id: req.body.course_id})
        .then(report => res.json(report))
        .catch(err => res.status(400).json({error: 'Unable to find this reports for course'}));
});

router.post('/getCourseStudentsCount', (req, res) => {
    Report.count({course_id: req.body.course_id})
        .then(report => res.json(report))
        .catch(err => res.status(400).json({error: 'Unable to find count for course'}));
})

router.post('/', (req, res) => {
    Report.create(req.body)
      .then(report => res.json({ msg: 'Report added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this report' }));
});

router.put('/:id', (req, res) => {
    Report.findByIdAndUpdate(req.params.id, req.body)
        .then(report => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

router.delete('/:id', (req, res) => {
    Report.findByIdAndRemove(req.params.id, req.body)
        .then(report => res.json({mgs: 'Report entry deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such report'}));
});

module.exports = router;