const express = require('express');
const router = express.Router();

const Complaint = require("../models/complaint");

router.get('/'), async (req, res) => {
  res.status(200).json({
    message: "OK",
  })
}

router.post('/complaint', async (req, res) => {
    const newComplaint = new Complaint({
      'title': req.body.title,
      'description': req.body.description,
    });
    // console.log(newComplaint)
    const savedComplaint = await newComplaint.save();
    res.status(200).send(savedComplaint);
    // try {
      
    //   console.log(savedComplaint)
    //   res.status(200).json(savedComplaint);
    // } catch (err) {
    //   res.status(500).json({ error: err });
    // }
  });
  


module.exports = router;