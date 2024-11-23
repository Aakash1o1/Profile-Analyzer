// Utility function to fetch data
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred. Please try again.");
        });
}

// Fetch and display user profile
function fetchProfile() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a LeetCode username!');
        return;
    }

    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    // Fetch profile data and display it
    fetchData(url)
        .then(data => {
            if (data.status === "success") {
                displayProfile(data);
            } else {
                alert("Failed to fetch profile data. Please try again.");
            }
        });
}

// Display the profile info on the page
function displayProfile(data) {
    document.getElementById('profile-info').style.display = 'block';
    document.getElementById('profile-img').src = data.avatarUrl || 'default-avatar.png';  // Use default if avatarUrl is missing
    document.getElementById('user-name').innerText = data.userName;
    document.getElementById('user-id').innerText = `ID: ${data.userId}`;
    document.getElementById('bio').innerText = `Reputation: ${data.reputation}`;
    document.getElementById('problems-solved').innerText = `${data.totalSolved}`;
    document.getElementById('ranking').innerText = `${data.ranking}`;
    document.getElementById('acceptance-rate').innerText = `${data.acceptanceRate}%`;
    document.getElementById('easy-solved').innerText = `${data.easySolved}`;
    document.getElementById('medium-solved').innerText = `${data.mediumSolved}`;
    document.getElementById('hard-solved').innerText = `${data.hardSolved}`;
}

// Show calendar page
function showCalendarPage() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a LeetCode username!');
        return;
    }

    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('calendar-section').style.display = 'block';

    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    // Fetch calendar data and display it
    fetchData(url)
        .then(data => {
            if (data.status === "success") {
                displayCalendar(data.submissionCalendar);
            } else {
                alert("Failed to fetch calendar data. Please try again.");
            }
        });
}

// Display the calendar data
function displayCalendar(submissionCalendar) {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; // Clear any existing content

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day headers to the grid
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.innerText = day;
        calendarContainer.appendChild(dayHeader);
    });

    // Calculate first and last days of the current month
    const firstDate = new Date();
    const firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1).getDay();
    const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);

    // Create empty grid cells for leading empty days
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarContainer.appendChild(emptyCell);
    }

    // Loop through all days of the month and populate the calendar
    for (let day = 1; day <= lastDate.getDate(); day++) {
        const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
        const timestamp = Math.floor(date.getTime() / 1000);

        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = day;

        // If there are submissions, display the count
        const activityCount = submissionCalendar[timestamp] || 0;
        if (activityCount > 0) {
            const countElement = document.createElement('span');
            countElement.classList.add('activity-count');
            countElement.innerText = activityCount;
            dayElement.appendChild(countElement);
        }

        // Add the day element to the calendar grid
        calendarContainer.appendChild(dayElement);
    }
}

// Go back to the profile section
function backToProfile() {
    document.getElementById('calendar-section').style.display = 'none';
    document.getElementById('profile-section').style.display = 'block';
}