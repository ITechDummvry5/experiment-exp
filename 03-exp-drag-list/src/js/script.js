let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

// Loop through all draggable list items
for (let list of lists) {

    // Triggered when dragging starts on a list item
    list.addEventListener("dragstart", function (dragactions) {

        // Store the currently dragged element
        let selected = dragactions.target;

        // Allow dropping into the right box
        rightBox.addEventListener("dragover", function (dragactions) {
            dragactions.preventDefault(); // Required to allow drop
        });

        // When item is dropped into the right box
        rightBox.addEventListener("drop", function (dragactions) {
            rightBox.appendChild(selected); // Move dragged item
            selected = null; // Clear selection
        });

        // Allow dropping into the left box
        leftBox.addEventListener("dragover", function (dragactions) {
            dragactions.preventDefault(); // Required to allow drop
        });

        // When item is dropped into the left box
        leftBox.addEventListener("drop", function (dragactions) {
            leftBox.appendChild(selected); // Move dragged item
            selected = null; // Clear selection
        });

    });
}
