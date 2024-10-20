// Dummy data to simulate user's enrolled courses
const coursesData = [
    { id: 'child_minding', name: 'Child Minding', image: 'child_minding.jpg' },
    { id: 'cooking', name: 'Cooking', image: 'cooking.jpg' },
    { id: 'first_aid', name: 'First Aid', image: 'first_aid.jpg' },
    { id: 'garden_maintenance', name: 'Garden Maintenance', image: 'garden_maintenance.jpg' },
    { id: 'landscaping', name: 'Landscaping', image: 'landscaping.jpg' },
    { id: 'life_skills', name: 'Life Skills', image: 'life_skills.jpg' },
    { id: 'precious', name: 'Precious', image: 'precious.jpg' },
    { id: 'sewing', name: 'Sewing', image: 'sewing.jpg' }
];

// Save this data in localStorage (to simulate a user enrolling in all these courses)
localStorage.setItem('enrolledCourses', JSON.stringify(coursesData));

// Function to dynamically display enrolled courses
function displayEnrolledCourses() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    const container = document.getElementById('courses-container');

    if (enrolledCourses.length === 0) {
        container.innerHTML = '<p>No courses enrolled. <a href="six_week_courses.html">Browse Courses</a></p>';
        return;
    }

    enrolledCourses.forEach(course => {
        const courseBox = document.createElement('div');
        courseBox.classList.add('course-box');

        courseBox.innerHTML = `
            <img src="images/${course.image}" alt="${course.name}" class="course-image">
            <h3>${course.name}</h3>
            <p>Completion: <span id="${course.id}-progress">0%</span></p>
            <div class="progress-bar">
                <div class="progress" id="${course.id}-bar" style="width: 0%;"></div>
            </div>
            <button onclick="increaseProgress('${course.id}')">Start/Continue</button>
            <button onclick="removeCourse('${course.id}')">Remove</button>
        `;
        container.appendChild(courseBox);
    });
}

function increaseProgress(courseId) {
    const progressText = document.getElementById(`${courseId}-progress`);
    const progressBar = document.getElementById(`${courseId}-bar`);

    let currentProgress = parseInt(progressText.innerText.replace('%', ''));

    if (currentProgress < 100) {
        currentProgress += 15;
        progressText.innerText = `${currentProgress}%`;
        progressBar.style.width = `${currentProgress}%`;
    }
}

function removeCourse(courseId) {
    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    enrolledCourses = enrolledCourses.filter(course => course.id !== courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    location.reload(); // Refresh the page to update the courses
}
