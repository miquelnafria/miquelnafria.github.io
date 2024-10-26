

// Function to create HTML elements
function createLyricsHTML(data, index) {
    const container = document.getElementById(`lyrics-${index}`); // Select all containers with the class "lyrics-jaume"

        container.innerHTML = ""; // Clear any existing content

        data.forEach((paragraphData) => {
            // Create a new paragraph container
            const paragraph = document.createElement("div");
            paragraph.classList.add("paragraph");

            paragraphData.paragraph.forEach((lineData) => {
                // Create a new line container
                const line = document.createElement("div");
                line.classList.add("line");

                let previousChord = ""; // Track the previous chord

                lineData.forEach((item) => {
                    const textWithChord = document.createElement("div");
                    textWithChord.classList.add("text-with-chord");

                    const chord = document.createElement("p");
                    chord.classList.add("special");
                    chord.classList.add("chord");
                    chord.textContent = item.chord;

                    const text = document.createElement("p");
                    text.classList.add("chord-text");

                    text.textContent = item.text;

                    // Check if chord is empty or same as previous chord
                    if (item.chord === "" || item.chord === previousChord) {
                        chord.classList.add("empty");
                    } else {
                        chord.classList.remove("empty");
                    }

                    textWithChord.appendChild(chord);
                    textWithChord.appendChild(text);
                    line.appendChild(textWithChord);

                    previousChord = item.chord; // Update the previous chord
                });

                paragraph.appendChild(line);
            });

            container.appendChild(paragraph);
        });
}

async function loadDataAndCreateHTML() {
    try {
        // Assuming indexData contains the range or list of files to load
        for (let i = 1; i <= 12; i++) {
            // Create the filename with leading zero if necessary (e.g., "01.json", "02.json", ...)
            const filename = i.toString().padStart(2, '0') + '.json';
            const response = await fetch(`acords/${filename}`);
            const data = await response.json();

            // Call your function to create HTML, passing the data and the index (i)
            createLyricsHTML(data, i);
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
loadDataAndCreateHTML();
