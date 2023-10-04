document.addEventListener('DOMContentLoaded', () => {
    const moodForm = document.getElementById('mood-form');
    moodForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      // Get the selected mood and date from the form
      const mood = moodForm.elements['mood'].value;
      const date = moodForm.elements['date'].value;
  
      // Send the mood data to the server using fetch
      fetch('/add-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, date }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message); // Show a simple message to confirm mood entry
          moodForm.reset(); // Clear the form after submission
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        });
    });
  });
  