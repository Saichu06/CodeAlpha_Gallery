// Sample image data - replace with your actual image URLs
const galleryData = [
    {
        id: 1,
        src: 'https://picsum.photos/400/300?random=1',
        category: 'nature',
        title: 'Mountain Lake',
        description: 'Beautiful mountain lake reflection'
    },
    {
        id: 2,
        src: 'https://picsum.photos/400/300?random=2',
        category: 'architecture',
        title: 'Modern Building',
        description: 'Contemporary architectural design'
    },
    {
        id: 3,
        src: 'https://picsum.photos/400/300?random=3',
        category: 'abstract',
        title: 'Color Burst',
        description: 'Abstract color composition'
    },
    {
        id: 4,
        src: 'https://picsum.photos/400/300?random=4',
        category: 'portrait',
        title: 'Portrait Study',
        description: 'Character portrait photography'
    },
    {
        id: 5,
        src: 'https://picsum.photos/400/300?random=5',
        category: 'nature',
        title: 'Forest Path',
        description: 'Peaceful forest walkway'
    },
    {
        id: 6,
        src: 'https://picsum.photos/400/300?random=6',
        category: 'architecture',
        title: 'Glass Tower',
        description: 'Reflective glass architecture'
    },
    {
        id: 7,
        src: 'https://picsum.photos/400/300?random=7',
        category: 'abstract',
        title: 'Geometric Forms',
        description: 'Abstract geometric patterns'
    },
    {
        id: 8,
        src: 'https://picsum.photos/400/300?random=8',
        category: 'portrait',
        title: 'Street Portrait',
        description: 'Urban portrait photography'
    },
    {
        id: 9,
        src: 'https://picsum.photos/400/300?random=9',
        category: 'nature',
        title: 'Ocean Waves',
        description: 'Dynamic ocean seascape'
    },
    {
        id: 10,
        src: 'https://picsum.photos/400/300?random=10',
        category: 'architecture',
        title: 'Historic Bridge',
        description: 'Classic bridge architecture'
    },
    {
        id: 11,
        src: 'https://picsum.photos/400/300?random=11',
        category: 'abstract',
        title: 'Light Play',
        description: 'Abstract light and shadow'
    },
    {
        id: 12,
        src: 'https://picsum.photos/400/300?random=12',
        category: 'portrait',
        title: 'Artistic Portrait',
        description: 'Creative portrait composition'
    }
];

// Global variables
let currentFilter = 'all';
let currentImages = [];
let currentIndex = 0;
let currentPage = 0;
const imagesPerPage = 8;

// DOM elements
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const navPrev = document.getElementById('navPrev');
const navNext = document.getElementById('navNext');

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
});

// Initialize gallery with all images
function initializeGallery() {
    currentImages = galleryData;
    renderGallery();
    updateNavigation();
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Navigation buttons
    navPrev.addEventListener('click', () => navigateGallery(-1));
    navNext.addEventListener('click', () => navigateGallery(1));

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Click outside lightbox to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Handle filter button clicks
function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter images
    currentFilter = filter;
    currentPage = 0;
    
    if (filter === 'all') {
        currentImages = galleryData;
    } else {
        currentImages = galleryData.filter(img => img.category === filter);
    }
    
    renderGallery();
    updateNavigation();
}

// Render gallery images
function renderGallery() {
    const startIndex = currentPage * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const imagesToShow = currentImages.slice(startIndex, endIndex);
    
    if (imagesToShow.length === 0) {
        galleryGrid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1 / -1;">No images found for this category.</p>';
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    imagesToShow.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, startIndex + index);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create gallery item element
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = image.category;
    
    item.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="overlay">
            <h3>${image.title}</h3>
            <p>${image.description}</p>
        </div>
    `;
    
    item.addEventListener('click', () => openLightbox(index));
    
    return item;
}

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    const image = currentImages[currentIndex];
    
    lightboxImg.src = image.src;
    lightboxImg.alt = image.title;
    lightbox.classList.add('active');
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate lightbox
function navigateLightbox(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    } else if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    
    const image = currentImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.title;
}

// Navigate gallery pages
function navigateGallery(direction) {
    const totalPages = Math.ceil(currentImages.length / imagesPerPage);
    
    currentPage += direction;
    
    if (currentPage < 0) {
        currentPage = totalPages - 1;
    } else if (currentPage >= totalPages) {
        currentPage = 0;
    }
    
    renderGallery();
    updateNavigation();
}

// Update navigation button states
function updateNavigation() {
    const totalPages = Math.ceil(currentImages.length / imagesPerPage);
    
    navPrev.style.display = totalPages > 1 ? 'block' : 'none';
    navNext.style.display = totalPages > 1 ? 'block' : 'none';
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    } else {
        switch(e.key) {
            case 'ArrowLeft':
                navigateGallery(-1);
                break;
            case 'ArrowRight':
                navigateGallery(1);
                break;
        }
    }
}

// Utility function to add loading state
function showLoading() {
    galleryGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Utility function to handle image loading errors
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    };
}

// Add smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Optional: Add intersection observer for lazy loading
function setupIntersectionObserver() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}