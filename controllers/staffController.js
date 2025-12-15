const Staff = require('../models/Staff');

// Add staff member
exports.addStaff = async (req, res) => {
  try {
    const { name, role, department } = req.body;
    const staff = new Staff({ name, role, department, shifts: [] });
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Schedule shift
exports.scheduleShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    staff.shifts.push({ date, time });
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View staff availability (return current shifts, availability implied)
exports.viewAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json({ shifts: staff.shifts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update shift
exports.updateShift = async (req, res) => {
  try {
    const { id, shiftId } = req.params;
    const { date, time } = req.body;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    const shift = staff.shifts.id(shiftId);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    shift.date = date;
    shift.time = time;
    await staff.save();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel shift
exports.cancelShift = async (req, res) => {
  try {
    const { id, shiftId } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    const shift = staff.shifts.id(shiftId);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    staff.shifts.pull(shiftId);
    await staff.save();
    res.json({ message: 'Shift canceled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
