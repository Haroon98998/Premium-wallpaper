
const loginpage = document.getElementById("login-page");

function skip(){
   loginpage.style.display = "none";
}









// Wait for full page load
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  const MIN_TIME = 3000; // minimum 2 seconds

  const start = Date.now();

  // Ensure minimum 2 seconds loader display
  const showContent = () => {
    const elapsed = Date.now() - start;
    const remaining = MIN_TIME - elapsed;

    if (remaining > 0) {
      setTimeout(hideLoader, remaining);
    } else {
      hideLoader();
    }
  };

  const hideLoader = () => {
    loader.style.display = "none";
  };

  showContent();
});







    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
 // Unified active tab switching for both nav-item and top-nav-btn
const allNavButtons = document.querySelectorAll('.nav-item, .top-nav-btn');

allNavButtons.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        allNavButtons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});










  










    






































   document.querySelectorAll('.wallpaper-card').forEach(card => {
  const img = card.querySelector('.wallpaper-img');
  const resolutionText = card.querySelector('.resolution-text');

  function setResolution() {
    const resolution = `${img.naturalWidth} × ${img.naturalHeight}`;
    resolutionText.textContent = resolution;
    img.setAttribute('data-resolution', resolution); // ← this line sets the data-resolution attribute
  }

  // If already loaded
  if (img.complete) {
    setResolution();
  } else {
    img.onload = setResolution;
  }
});




















         function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    
    document.getElementById(pageId).style.display = 'block';
  }










function downloadImageWithWebsiteName(imageUrl) {
    const websiteName = "Premium-Wallpaper";

    // Clean up the filename from the URL and add the website name
    const originalFilename = imageUrl.split('/').pop().split('?')[0];
    const cleanFilename = originalFilename.replace(new RegExp(`-${websiteName}`, 'g'), '');
    const newFilename = cleanFilename.replace(/(\.[\w\d_-]+)$/i, `-${websiteName}$1`);

    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = newFilename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
            console.error("Download failed:", err);
            // Optionally, show a user-friendly error message here
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the 'download-trigger' class
    const downloadTriggers = document.querySelectorAll('.download-trigger');

    downloadTriggers.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default button behavior (e.g., form submission)

            // Get the image URL directly from the data-image-url attribute of the clicked button
            const imageUrl = this.getAttribute('data-image-url');

            if (imageUrl) {
                downloadImageWithWebsiteName(imageUrl);
            } else {
                console.error("No image URL found for this download button.");
            }
        });
    });
});



































  const images = document.querySelectorAll(".image-item");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let currentIndex = 0;
  const batchSize = 6;

  function showNextBatch() {
    for (let i = currentIndex; i < currentIndex + batchSize; i++) {
      if (images[i]) {
        images[i].style.display = "inline-block";
      }
    }
    currentIndex += batchSize;
  }

  // Show first batch on page load
  showNextBatch();

  // On button click, show next batch
  loadMoreBtn.addEventListener("click", showNextBatch);




















 // Replace your existing preview button event listener with this:
document.addEventListener('click', function(e) {
    // Check if clicked element is a preview button or inside one
    const previewBtn = e.target.closest('.preview-btn');
    if (previewBtn) {
        const wallpaperCard = previewBtn.closest('.wallpaper-mobile-card, .image-card');
        if (wallpaperCard) {
            const img = wallpaperCard.querySelector('.wallpaper-img');
            if (img) {
                const modal = document.getElementById('previewModal');
                const modalImg = document.getElementById('modalImage');
                const imageName = document.getElementById('imageName');
                const downloadBtn = document.getElementById('downloadBtn');
                
                modal.style.display = "block";
                modalImg.src = img.src;
                imageName.textContent = img.dataset.name || "Wallpaper";
                downloadBtn.dataset.imageUrl = img.src;
                
                // Set resolution if available
                const resolutionElement = document.getElementById('imageResolution');
                if (img.dataset.resolution) {
                    resolutionElement.textContent = img.dataset.resolution;
                } else {
                    resolutionElement.textContent = "";
                }
            }
        }
    }
    
    // Close modal when clicking on close button
    if (e.target.classList.contains('close') || e.target === document.getElementById('previewModal')) {
        document.getElementById('previewModal').style.display = "none";
    }
});




























  // Color Picker Functionality
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPanel = document.getElementById('colorPanel');
const colorOptions = document.querySelectorAll('.color-option');
const customColorInput = document.getElementById('customColor');

// Toggle color picker panel
colorPickerBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  colorPanel.style.display = colorPanel.style.display === 'block' ? 'none' : 'block';
});

// Close panel when clicking outside
document.addEventListener('click', function() {
  colorPanel.style.display = 'none';
});

// Prevent panel from closing when clicking inside it
colorPanel.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Apply color from predefined options
colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    const color = this.getAttribute('data-color');
    document.body.style.backgroundColor = color;
    localStorage.setItem('bgColor', color); // Save to localStorage
  });
});

// Apply custom color
customColorInput.addEventListener('input', function() {
  document.body.style.backgroundColor = this.value;
  localStorage.setItem('bgColor', this.value); // Save to localStorage
});

// Load saved color on page load
window.addEventListener('load', function() {
  const savedColor = localStorage.getItem('bgColor');
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    customColorInput.value = savedColor;
  }
});



// Default color functionality
const defaultColorBtn = document.getElementById('defaultColorBtn');
const DEFAULT_COLOR = 'rgb(7, 7, 7)'; // Change this to your original background color

defaultColorBtn.addEventListener('click', function() {
  document.body.style.backgroundColor = DEFAULT_COLOR;
  localStorage.setItem('bgColor', DEFAULT_COLOR);
  customColorInput.value = DEFAULT_COLOR;
});
  


































  const searchBox = document.getElementById('search-input');

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support speech recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition(); // for Chrome
  recognition.lang = 'en-US'; // 🟢 Language set to English
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    searchBox.value = transcript;
    console.log("You said:", transcript);
  };

  recognition.onerror = function(event) {
    console.error("Error occurred:", event.error);
  };

  recognition.start();
}








































// Get all video slides
const videoSlides = document.querySelectorAll('.video-slide');
const totalSlides = videoSlides.length;
let currentSlideIndex = 0;

// Initialize all videos
function initVideos() {
    videoSlides.forEach((slide, index) => {
        const video = slide.querySelector('.slide-video');
        const playPauseBtn = slide.querySelector('.play-pause-btn');
        
        // Remove loop attribute
        video.removeAttribute('loop');
        
        // Setup progress bar
        setupVideoProgress(video);
        
        // Set initial state
        playPauseBtn.classList.add('active');
        playPauseBtn.querySelector('.play-icon').style.display = 'block';
        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
        
        // Add click event to play/pause button only
        playPauseBtn.addEventListener('click', () => togglePlay(slide));
        
        // Removed: video.addEventListener('click', () => togglePlay(slide));
        
        // Add ended event to play next video
        video.addEventListener('ended', () => playNextVideo());
    });
    
    // Start with first video
    playVideo(videoSlides[0]);
}

// Play a specific video
function playVideo(slide) {
    pauseAllVideos();
    const video = slide.querySelector('.slide-video');
    const playPauseBtn = slide.querySelector('.play-pause-btn');
    
    video.currentTime = 0;
    video.play();
    
    // Update button state
    playPauseBtn.querySelector('.play-icon').style.display = 'none';
    playPauseBtn.querySelector('.pause-icon').style.display = 'block';
    
    // Update current slide index
    currentSlideIndex = Array.from(videoSlides).indexOf(slide);
}

// Pause all videos
function pauseAllVideos() {
    videoSlides.forEach(slide => {
        const video = slide.querySelector('.slide-video');
        const playPauseBtn = slide.querySelector('.play-pause-btn');
        
        video.pause();
        video.currentTime = 0;
        
        // Update button state
        if (playPauseBtn) {
            playPauseBtn.querySelector('.play-icon').style.display = 'block';
            playPauseBtn.querySelector('.pause-icon').style.display = 'none';
        }
    });
}

// Toggle play/pause for a specific slide
function togglePlay(slide) {
    const video = slide.querySelector('.slide-video');
    const playPauseBtn = slide.querySelector('.play-pause-btn');
    
    if (video.paused) {
        pauseAllVideos();
        video.play();
        playPauseBtn.querySelector('.play-icon').style.display = 'none';
        playPauseBtn.querySelector('.pause-icon').style.display = 'block';
        currentSlideIndex = Array.from(videoSlides).indexOf(slide);
    } else {
        video.pause();
        playPauseBtn.querySelector('.play-icon').style.display = 'block';
        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
    }
}

// Play next video
function playNextVideo() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    playVideo(videoSlides[currentSlideIndex]);
}

// Play previous video
function playPrevVideo() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    playVideo(videoSlides[currentSlideIndex]);
}

// Setup video progress bar
function setupVideoProgress(video) {
    const progressFill = video.parentElement.querySelector(".video-progress-fill");

    function updateProgress() {
        if (video.duration > 0) {
            const percent = video.currentTime / video.duration;
            progressFill.style.transform = `scaleX(${percent})`;
        }
        if (!video.paused && !video.ended) {
            requestAnimationFrame(updateProgress);
        }
    }

    video.addEventListener("play", () => {
        requestAnimationFrame(updateProgress);
    });

    video.addEventListener("ended", () => {
        progressFill.style.transform = "scaleX(0)";
    });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") playNextVideo();
    if (e.key === "ArrowLeft") playPrevVideo();
});

// Initialize when DOM is loaded
window.addEventListener("DOMContentLoaded", initVideos);



























        function downloadImageWithWebsiteName(imageUrl) {
    const websiteName = "Premium-Wallpaper";

    // Clean up the filename from the URL and add the website name
    const originalFilename = imageUrl.split('/').pop().split('?')[0];
    const cleanFilename = originalFilename.replace(new RegExp(`-${websiteName}`, 'g'), '');
    const newFilename = cleanFilename.replace(/(\.[\w\d_-]+)$/i, `-${websiteName}$1`);

    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = newFilename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
            console.error("Download failed:", err);
            // Optionally, show a user-friendly error message here
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the 'download-trigger' class
    const downloadTriggers = document.querySelectorAll('.download-trigger-video');

    downloadTriggers.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default button behavior (e.g., form submission)

            // Get the image URL directly from the data-image-url attribute of the clicked button
            const imageUrl = this.getAttribute('data-image-url');

            if (imageUrl) {
                downloadImageWithWebsiteName(imageUrl);
            } else {
                console.error("No image URL found for this download button.");
            }
        });
    });
});