const images = [
    {
        id: 1,
        title: "Beautiful Mountain",
        category: "nature",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
    },
    {
        id: 2,
        title: "Forest",
        category: "nature",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b"
    },
    {
        id: 3,
        title: "Portrait",
        category: "people",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
        id: 4,
        title: "Woman Portrait",
        category: "people",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
        id: 5,
        title: "Cute Dog",
        category: "animals",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d"
    },
    {
        id: 6,
        title: "Wild Animal",
        category: "animals",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615"
    },
    {
        id: 7,
        title: "City Buildings",
        category: "city",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
    },
    {
        id: 8,
        title: "City Street",
        category: "city",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
    }
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

const closeBtn = document.getElementById("closeBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

let currentCategory = "all";
let filteredImages = [];
let currentIndex = 0;

function displayImages() {
    const searchText = searchInput.value.toLowerCase();

    filteredImages = images.filter((item) => {
        const categoryMatch =
            currentCategory === "all" ||
            item.category === currentCategory;

        const searchMatch =
            item.title.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });

    gallery.innerHTML = "";

    if (filteredImages.length === 0) {
        gallery.innerHTML = `<div class="no-results">No images found.</div>`;
        return;
    }

    filteredImages.forEach((item, index) => {
        const card = document.createElement("div");

        card.className = "gallery-card";

        card.innerHTML = `<button class="like-btn">♡</button>

            <img
                src="${item.image}?auto=format&fit=crop&w=600&q=80"
                alt="${item.title}"
                data-index="${index}"
            >

            <div class="card-info">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        `;

        gallery.appendChild(card);

        const image = card.querySelector("img");
        const likeButton = card.querySelector(".like-btn");

        image.addEventListener("click", () => {
            currentIndex = index;
            openModal();
        });

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("liked");

            if (likeButton.classList.contains("liked")) {
                likeButton.textContent = "♥";
            } else {
                likeButton.textContent = "♡";
            }
        });
    });
}

function openModal() {
    const item = filteredImages[currentIndex];
    modalImage.src =item.image + "?auto=format&fit=crop&w=1200&q=90";
    modalTitle.textContent = item.title;
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

function showNext() {
    currentIndex++;
    if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
    }
    openModal();
}

function showPrevious() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = filteredImages.length - 1;
    }
    openModal();
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentCategory = button.dataset.category;
        displayImages();
    });
});

searchInput.addEventListener("input", displayImages);
closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
previousBtn.addEventListener("click", showPrevious);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("show")) {
        return;
    }
    if (event.key === "Escape") {
        closeModal();
    }
    if (event.key === "ArrowRight") {
        showNext();
    }
    if (event.key === "ArrowLeft") {
        showPrevious();
    }
});

displayImages();