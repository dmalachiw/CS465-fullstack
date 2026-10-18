const mongoose = require('mongoose');
require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to load trips.'
        });
    }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Model.find({
            code: req.params.tripCode
        }).exec();

        if (trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to load the trip.'
        });
    }
};

// POST: /api/trips
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(trip);
    } catch (error) {
        return res.status(
            error.code === 11000 ? 409 : 400
        ).json({
            message: error.message
        });
    }
};

// PUT: /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Model.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                $set: {
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            },
            { new: true, runValidators: true }
        ).exec();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        return res.status(200).json(trip);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// DELETE: /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Model.findOneAndDelete({
            code: req.params.tripCode
        }).exec();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to delete the trip.'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};