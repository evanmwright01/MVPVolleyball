// script.js

// Dictionary to track total minutes practiced by each player and breakdown by practice type
const minutesTracker = {};

// Predefined player names
const playerNames = ["Mena", "Emma", "Realin", "Ally", "Jayda", "Mia B", "Micha", "Lulu", "Rachel", "Mia Z", "Samantha", "Kirstyn", "Coach Mary", "Coach Hannah"];

// Initialize minutesTracker with 0 minutes for each player
playerNames.forEach((player) => {
    minutesTracker[player] = { totalMinutes: 0, breakdown: {} };
});

// Trigger the initial update of the leaderboard on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLeaderboard();
});

function submitPractice(isInitialSubmission = false) {
    // Get form values
    const name = document.getElementById('name').value;
    const minutes = parseInt(document.getElementById('minutes').value, 10);
    const practiceType = document.getElementById('practiceType').value;

    // Validate form values (skip validation for initial submission)
    if (!isInitialSubmission && (!name || isNaN(minutes) || !practiceType)) {
        alert('Please fill in all fields with valid values.');
        return;
    }

    // Update minutesTracker
    minutesTracker[name].totalMinutes += minutes;

    if (minutesTracker[name].breakdown[practiceType]) {
        minutesTracker[name].breakdown[practiceType] += minutes;
    } else {
        minutesTracker[name].breakdown[practiceType] = minutes;
    }

    // Update leaderboard
    updateLeaderboard();

    // Clear form
    document.getElementById('minutes').value = '';
    document.getElementById('practiceType').value = '';
}

function updateLeaderboard() {
    // Sort players by total minutes practiced
    const sortedPlayers = Object.keys(minutesTracker).sort((a, b) => minutesTracker[b].totalMinutes - minutesTracker[a].totalMinutes);

    // Update leaderboard dynamically with ranking
    const leaderboardBody = document.querySelector('#leaderboard tbody');
    leaderboardBody.innerHTML = ''; // Clear existing entries

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player}</td>
            <td>${minutesTracker[player].totalMinutes}</td>
            <td>${getPracticeTypeBreakdown(minutesTracker[player].breakdown)}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function getPracticeTypeBreakdown(breakdown) {
    return Object.entries(breakdown).map(([type, minutes]) => `${type}: ${minutes} minutes`).join('<br>');
}