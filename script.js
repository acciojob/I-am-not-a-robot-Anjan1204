document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('imageContainer');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const messagePara = document.getElementById('para');
    const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    
    let selectedImages = [];
    let duplicateImage = '';
    let shuffledImages = [];

    // Initialize the game
    function initGame() {
        // Clear previous state
        imageContainer.innerHTML = '';
        selectedImages = [];
        messagePara.textContent = '';
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';

        // Select a random image to duplicate
        duplicateImage = images[Math.floor(Math.random() * images.length)];
        
        // Create array with 5 unique images + 1 duplicate
        shuffledImages = [...images, duplicateImage];
        
        // Shuffle the array
        shuffledImages = shuffleArray(shuffledImages);
        
        // Create image elements
        shuffledImages.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `https://picsum.photos/200/200?random=${img}`;
            imgElement.alt = img;
            imgElement.dataset.index = index;
            imgElement.addEventListener('click', handleImageClick);
            imageContainer.appendChild(imgElement);
        });
    }

    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function handleImageClick(e) {
        const clickedImage = e.target;
        const clickedIndex = parseInt(clickedImage.dataset.index);
        
        // If already selected, deselect it
        if (selectedImages.includes(clickedIndex)) {
            clickedImage.classList.remove('selected');
            selectedImages = selectedImages.filter(idx => idx !== clickedIndex);
        } 
        // If less than 2 selected, select it
        else if (selectedImages.length < 2) {
            clickedImage.classList.add('selected');
            selectedImages.push(clickedIndex);
        }
        
        // Update UI based on selection count
        updateUI();
    }

    function updateUI() {
        // Show reset button if at least one image is selected
        resetBtn.style.display = selectedImages.length > 0 ? 'block' : 'none';
        
        // Show verify button if exactly two images are selected
        verifyBtn.style.display = selectedImages.length === 2 ? 'block' : 'none';
        
        // Clear any previous message
        if (selectedImages.length !== 2) {
            messagePara.textContent = '';
        }
    }

    function verifySelection() {
        if (selectedImages.length !== 2) return;
        
        const [firstIdx, secondIdx] = selectedImages;
        const firstImg = shuffledImages[firstIdx];
        const secondImg = shuffledImages[secondIdx];
        
        if (firstImg === secondImg) {
            messagePara.textContent = "You are a human. Congratulations!";
            messagePara.style.color = "green";
        } else {
            messagePara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            messagePara.style.color = "red";
        }
        
        // Hide verify button after verification
        verifyBtn.style.display = 'none';
    }

    // Event listeners
    resetBtn.addEventListener('click', initGame);
    verifyBtn.addEventListener('click', verifySelection);

    // Initialize the game on page load
    initGame();
});