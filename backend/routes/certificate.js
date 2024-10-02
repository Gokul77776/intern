const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern'); // MongoDB model for Intern
const mongoose = require('mongoose');

// Assuming the 6-digit code is stored in the "uniqueId" field of the Intern model
router.get('/validate-user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure the ID is a valid 6-digit number
    if (userId.length !== 6 || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid 6-digit code' });
    }

    // Find the intern based on the uniqueId field (which stores the 6-digit code)
    const intern = await Intern.findOne({ uniqueId: userId });

    if (intern) {
      res.status(200).json({
        isValid: true,
        name: intern.name,
        duration: `${intern.startDate} to ${intern.endDate}`, // You may format the dates as needed
        date: new Date().toLocaleDateString(), // Current date
      });
    } else {
      res.status(404).json({ isValid: false, message: 'No intern found for the provided ID' });
    }
  } catch (err) {
    console.error('Error during validation:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
