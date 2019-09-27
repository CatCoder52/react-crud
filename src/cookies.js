// Get the contents from storage
function getCoursesFromStorage() {

     let courses;

     // if something exist on storage then we get the value, otherwise create an empty array
     if(localStorage.getItem('courses') === null) {
          courses = [];
     } else {
          courses = JSON.parse(localStorage.getItem('courses') );
     }
     return courses;


}


// Add the courses into the local storage

function saveIntoStorage(course) {

     let courses = getCoursesFromStorage();

     // add the course into the array
     courses.push(course);

     // since storage only saves strings, we need to convert JSON into String
     localStorage.setItem('courses', JSON.stringify(courses) );
}



// remove one item from local storage
function removeCourseLocalStorage(id) {
     // get the local storage data
     let coursesLS = getCoursesFromStorage();

     // loop trought the array and find the index to remove
     coursesLS.forEach(function(courseLS, index) {
          if(courseLS.id === id) {
               coursesLS.splice(index, 1);
          }
     });

     // Add the rest of the array
     localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clears the shopping cart
function clearCart() {
     // shoppingCartContent.innerHTML = '';

     while(shoppingCartContent.firstChild) {
          shoppingCartContent.removeChild(shoppingCartContent.firstChild);
     }

     // Clear from Local Storage
     clearLocalStorage();
}
// Clears the whole local storage
function clearLocalStorage() {
     localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {

     let coursesLS = getCoursesFromStorage();

}