document.addEventListener("DOMContentLoaded", function() {
    var editable = document.querySelector(".inputTextBack");
    // Add event listener to enable editing on click
    editable.addEventListener('click', enableEditing);

    function enableEditing() {
        editable.contentEditable = true;
        editable.innerText = ''; // Clear the initial text content
        editable.focus();
    }

    function handleFormSubmission() {
        var enteredText = editable.innerText.trim(); // Get the text entered by the user and trim whitespace
        console.log("Entered Text:", enteredText); // Log the entered text
        // Add any form submission logic here

        var directionElement = document.querySelector(".direction");
       
        var checkPass = ifPass(enteredText);

        if(enteredText.length != 8 || !checkPass)
        {
            directionElement.classList.add('error');
        }
        else 
        {
            directionElement.classList.remove('error');
            localStorage.setItem('enteredText', enteredText); // Save the enteredText in local storage
            window.location.href = 'timerPage.html'; // Navigate to page2.html
            // Add any form submission logic here if needed
        }
    }

    // Add event listener for key press (Enter)
    editable.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter behavior
            handleFormSubmission();
            editable.blur(); // Remove focus from the editable div
        }
    });

    // Add event listener for input to limit character length
    editable.addEventListener('input', function(event) {
        var text = editable.innerText;
        if (text.length > 8) {
            editable.innerText = text.slice(0, 8); // Limit to 8 characters
        }
    });

    // Add event listener to detect clicks outside the input box
    document.addEventListener('click', function(event) {
        if (!editable.contains(event.target) && editable.innerText.trim() === '') {
            editable.innerText = 'Input Text'; // Reset text if empty
            editable.contentEditable = false; // Make the content non-editable again
        }
    });

    function ifPass(enteredText) {
        var passChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ":"];
        var pass = true; 
    
        for (let i = 0; i < enteredText.length; i++) {
            var charValid = false; // Reset for each character
            for (let j = 0; j < passChar.length; j++) {
                if (enteredText[i] == passChar[j]) {
                    charValid = true;
                    break;
                }
            }
            if (!charValid) {
                pass = false;
                break;
            }
        }
        return pass;
    }
});
