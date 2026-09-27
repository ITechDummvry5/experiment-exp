// Get the form and image elements
const form = document.getElementById("contactForm");
const feedbackImage = document.getElementById("feedbackImage");

// Image paths
const defaultImg = "images/airplane.png"; // Default (idle)
const successImg = "images/check.png";    // Shown when form is valid
const errorImg = "images/wrong.png";      // Shown when form has errors

// When the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form from refreshing the page

  // Get all the input groups
  const inputGroups = form.querySelectorAll(".input-group");

  // Start by assuming the form is valid
  let formIsValid = true;

  // Loop through each input group
  inputGroups.forEach((group) => {
    const input = group.querySelector("input, textarea"); // Get input or textarea
    const errorText = group.querySelector(".error");      // Get error span

    let hasError = false; // We'll check this for each input

    // 1 Check if the field is empty
    if (input.value.trim() === "") {
      hasError = true;
    }
    // 2 Check if it's an email input and validate format
    else if (input.type === "email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Basic email pattern
      if (!emailPattern.test(input.value)) {
        hasError = true;
      }
    }
    // 3 Check if it's a phone input and validate format
    else if (input.type === "tel") {
      const phonePattern = /^[0-9\s-]{7,15}$/; // Numbers, spaces, dashes allowed
      if (!phonePattern.test(input.value)) {
        hasError = true;
      }
    }

    //  If there's an error, show it
    if (hasError) {
      group.classList.add("error");
      formIsValid = false; // Mark form as invalid
    } else {
      group.classList.remove("error");
    }
  });

  // Change header image based on result
  feedbackImage.classList.add("feedback-pop"); // Add animation
  if (formIsValid) {
    feedbackImage.src = successImg; // Show check
  } else {
    feedbackImage.src = errorImg; // Show wrong
  }

  //  After 2 seconds, reset back to airplane
  setTimeout(() => {
    feedbackImage.src = defaultImg;
    feedbackImage.classList.remove("feedback-pop");
  }, 2000);

  //  If form is valid, clear all inputs
  if (formIsValid) {
    form.reset();
  }
});
