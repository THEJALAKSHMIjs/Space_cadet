// Import Express 
const express = require('express');

// Import Controllers
const { login } = require('../Controller/userController');
const { addToWaitlist, getWaitlistStats } = require('../Controller/waitlistController');
const { getQuestions } = require('../Controller/questionController'); 

// Create router instance
const router = express.Router();

// Authentication Routes
router.post('/login', login);

// Waitlist Routes
router.post('/waitlist', addToWaitlist);
router.get('/stats', getWaitlistStats);

// Questions Route (New)
router.get('/questions', getQuestions); 

// Export router
module.exports = router;
