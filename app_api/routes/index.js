
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Verify JWT authentication
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization token required.'
        });
    }

    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token.'
        });
    }
};

// Authentication routes
// Public registration disabled to protect admin access
router
    .route('/login')
    .post(authController.login);

// Trip routes
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(requireAuth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(requireAuth, tripsController.tripsUpdateTrip)
    .delete(requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;
