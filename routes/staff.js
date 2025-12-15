const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Get all staff
router.get('/', async (req, res) => {
    try {
        const Staff = require('../models/Staff');
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add staff
router.post('/', staffController.addStaff);

// Schedule shift
router.post('/:id/shifts', staffController.scheduleShift);

// View staff availability (shifts)
router.get('/:id/availability', staffController.viewAvailability);

// Get staff shifts
router.get('/:id/shifts', staffController.viewAvailability);

// Update shift
router.put('/:id/shifts/:shiftId', staffController.updateShift);

// Cancel shift
router.delete('/:id/shifts/:shiftId', staffController.cancelShift);

module.exports = router;
