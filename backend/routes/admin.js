const express = require("express");
const router = express.Router();

const Complaint = require("../models/complaint");

router.get('/complaints', async (req, res) => {
    try {
      const complaints = await Complaint.find({});
      res.status(200).json(complaints);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
module.exports = router;