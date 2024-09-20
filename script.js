// Array to store homework assignments
const homeworkAssignments = [
    { subject: "Math", due: "September 25", task: "Complete worksheet on fractions" },
    { subject: "Science", due: "September 26", task: "Write a report on the water cycle" },
    { subject: "History", due: "September 27", task: "Study Chapter 3 for quiz" }
];

// Function to dynamically load homework assignments
function loadHomework() {
    const homeworkList = document.getElementById('homework');

    homeworkAssignments.forEach(assignment => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${assignment.subject}</strong>: ${assignment.task} (Due: ${assignment.due})`;
        homeworkList.appendChild(listItem);
    });
}

// Load homework when the page loads
window.onload = loadHomework;
