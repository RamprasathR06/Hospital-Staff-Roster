const API_BASE = 'http://localhost:3000/api';

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');

    // Load data based on section
    if (sectionId === 'staff-list') {
        loadStaff();
    }
}

// Load staff list
async function loadStaff() {
    try {
        const response = await fetch(`${API_BASE}/staff`);
        const staff = await response.json();
        displayStaff(staff);
        populateStaffSelects(staff);
    } catch (error) {
        showNotification('Error loading staff', 'error');
    }
}

// Display staff in grid
function displayStaff(staff) {
    const container = document.getElementById('staff-container');
    container.innerHTML = '';

    if (staff.length === 0) {
        container.innerHTML = '<p>No staff members found.</p>';
        return;
    }

    staff.forEach(member => {
        const card = document.createElement('div');
        card.className = 'staff-card';
        card.innerHTML = `
            <h3><i class="fas fa-user-md"></i> ${member.name}</h3>
            <p><i class="fas fa-briefcase"></i> ${member.role}</p>
            <p><i class="fas fa-building"></i> ${member.department}</p>
            <span class="staff-id">ID: ${member._id}</span>
        `;
        container.appendChild(card);
    });
}

// Populate staff selects
function populateStaffSelects(staff) {
    const selects = [
        'shift-staff-select',
        'view-staff-select',
        'update-staff-select',
        'cancel-staff-select'
    ];

    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">Choose staff member</option>';

        staff.forEach(member => {
            const option = document.createElement('option');
            option.value = member._id;
            option.textContent = `${member.name} (${member.role})`;
            select.appendChild(option);
        });
    });
}

// Load shifts for selected staff
async function loadShiftsForStaff(staffId, targetSelectId) {
    try {
        const response = await fetch(`${API_BASE}/staff/${staffId}/shifts`);
        const data = await response.json();

        if (response.ok) {
            const select = document.getElementById(targetSelectId);
            select.innerHTML = '<option value="">Choose shift</option>';

            data.shifts.forEach(shift => {
                const option = document.createElement('option');
                option.value = shift._id;
                option.textContent = `${shift.date} at ${shift.time}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading shifts:', error);
    }
}

// Event listeners
document.getElementById('staff-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('staff-name').value;
    const role = document.getElementById('staff-role').value;
    const department = document.getElementById('staff-department').value;

    try {
        const response = await fetch(`${API_BASE}/staff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role, department })
        });
        const data = await response.json();
        if (response.ok) {
            showNotification(`Staff added: ${data.name}`, 'success');
            e.target.reset();
            loadStaff(); // Refresh staff list
        } else {
            showNotification(data.error || 'Error adding staff', 'error');
        }
    } catch (error) {
        showNotification('Error adding staff', 'error');
    }
});

document.getElementById('shift-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const staffId = document.getElementById('shift-staff-select').value;
    const date = document.getElementById('shift-date').value;
    const time = document.getElementById('shift-time').value;

    try {
        const response = await fetch(`${API_BASE}/staff/${staffId}/shifts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time })
        });
        const data = await response.json();
        if (response.ok) {
            showNotification('Shift scheduled successfully', 'success');
            e.target.reset();
        } else {
            showNotification(data.error, 'error');
        }
    } catch (error) {
        showNotification('Error scheduling shift', 'error');
    }
});

function viewShifts() {
    const staffId = document.getElementById('view-staff-select').value;
    if (!staffId) {
        showNotification('Please select a staff member', 'warning');
        return;
    }

    fetch(`${API_BASE}/staff/${staffId}/shifts`)
        .then(response => response.json())
        .then(data => {
            if (data.shifts) {
                displayShifts(data.shifts);
            } else {
                showNotification(data.error, 'error');
            }
        })
        .catch(error => {
            showNotification('Error fetching shifts', 'error');
        });
}

document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const staffId = document.getElementById('update-staff-select').value;
    const shiftId = document.getElementById('update-shift-select').value;
    const date = document.getElementById('update-date').value;
    const time = document.getElementById('update-time').value;

    if (!staffId || !shiftId) {
        showNotification('Please select a staff member and shift to update', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/staff/${staffId}/shifts/${shiftId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time })
        });
        const data = await response.json();
        if (response.ok) {
            showNotification('Shift updated successfully', 'success');
            e.target.reset();
            // Reload shifts for the selected staff
            loadShiftsForStaff(staffId, 'update-shift-select');
        } else {
            showNotification(data.error, 'error');
        }
    } catch (error) {
        showNotification('Error updating shift', 'error');
    }
});

document.getElementById('cancel-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const staffId = document.getElementById('cancel-staff-select').value;
    const shiftId = document.getElementById('cancel-shift-select').value;

    if (!staffId || !shiftId) {
        showNotification('Please select a staff member and shift to cancel', 'warning');
        return;
    }

    if (!confirm('Are you sure you want to cancel this shift?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/staff/${staffId}/shifts/${shiftId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (response.ok) {
            showNotification('Shift canceled successfully', 'success');
            e.target.reset();
            // Reload shifts for the selected staff
            loadShiftsForStaff(staffId, 'cancel-shift-select');
        } else {
            showNotification(data.error, 'error');
        }
    } catch (error) {
        showNotification('Error canceling shift', 'error');
    }
});

// Event listeners for staff selection changes
document.getElementById('update-staff-select').addEventListener('change', (e) => {
    const staffId = e.target.value;
    if (staffId) {
        loadShiftsForStaff(staffId, 'update-shift-select');
    }
});

document.getElementById('cancel-staff-select').addEventListener('change', (e) => {
    const staffId = e.target.value;
    if (staffId) {
        loadShiftsForStaff(staffId, 'cancel-shift-select');
    }
});

function displayShifts(shifts) {
    const container = document.getElementById('shifts-display');
    container.innerHTML = '';

    if (shifts.length === 0) {
        container.innerHTML = '<p>No shifts scheduled for this staff member.</p>';
        return;
    }

    shifts.forEach(shift => {
        const card = document.createElement('div');
        card.className = 'shift-card';
        card.innerHTML = `
            <div class="shift-info">
                <span class="shift-date"><i class="fas fa-calendar"></i> ${shift.date}</span>
                <span class="shift-time"><i class="fas fa-clock"></i> ${shift.time}</span>
            </div>
            <span class="shift-id">ID: ${shift._id}</span>
        `;
        container.appendChild(card);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageSpan = document.getElementById('notification-message');

    messageSpan.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStaff();
});
