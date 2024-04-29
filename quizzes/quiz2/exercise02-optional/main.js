async function fetchCourses() {
    const url = `https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2024/fall/`;
    courseList = await fetch(url).then((response) => response.json());
    displayResults(courseList);
}

function displayResults(courses) {
    for (const c of courses) {
        if (c.Department == "CSCI") {
            const template = `<section class="course">
                <h3>${c.Code}: ${c.Title}</h3>
                <ul>
                    <li>Location: ${c.Location.FullLocation}</li>
                    <li>Days: ${c.Days}</li>
                </ul>
            </section>`

            const section = document.getElementById("results")
            section.insertAdjacentHTML('beforeend', template)
        }
    }

    console.log(courses);
}
