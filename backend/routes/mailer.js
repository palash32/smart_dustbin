const express = require('express');
const router = express.Router();

const sendEmail = require("../controller/sendEmail");

router.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;

  try {
    await sendEmail(recipient, subject, body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email from backend:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
 