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