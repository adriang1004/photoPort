let currentIndex = 0;
let currentFilter = 'all';

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.gallery-image');
    const galleryIndicator = document.createElement('div');
    galleryIndicator.className = 'gallery-indicator';
    document.querySelector('.gallery-container').appendChild(galleryIndicator);
    const totalImages = images.length;

    function updateGallery() {
        const filteredImages = Array.from(images).filter(img => currentFilter === 'all' || img.dataset.category === currentFilter);
        filteredImages.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex);
        });

        images.forEach(img => {
            if (!filteredImages.includes(img)) {
                img.classList.remove('active');
            }
        });

        // Update the gallery indicator color based on the category of the current image
        if (filteredImages.length > 0) {
            const currentCategory = filteredImages[currentIndex].dataset.category;
            if (currentCategory === 'film') {
                galleryIndicator.style.backgroundColor = '#ffc0cb'; // Pink for film
            } else if (currentCategory === 'digital') {
                galleryIndicator.style.backgroundColor = '#1a062c'; // Dark purple for digital
            } else {
                galleryIndicator.style.backgroundColor = 'transparent'; // Default color
            }
        } else {
            galleryIndicator.style.backgroundColor = 'transparent'; // Default color when no images are shown
        }
    }

    function showPrevImage() {
        const filteredImages = Array.from(images).filter(img => currentFilter === 'all' || img.dataset.category === currentFilter);
        currentIndex = (currentIndex === 0) ? filteredImages.length - 1 : currentIndex - 1;
        updateGallery();
    }

    function showNextImage() {
        const filteredImages = Array.from(images).filter(img => currentFilter === 'all' || img.dataset.category === currentFilter);
        currentIndex = (currentIndex === filteredImages.length - 1) ? 0 : currentIndex + 1;
        updateGallery();
    }

    document.querySelector('.prev').addEventListener('click', showPrevImage);
    document.querySelector('.next').addEventListener('click', showNextImage);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        }
    });

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            currentIndex = 0;
            updateGallery();
        });
    });

    updateGallery(); 
});
