const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let photosArray = [];
let ready = false;
let numberOfImagesLoaded = 0;
let totalImages = 0;

//Unsplash api
const apiKey = "7NG5Z8W7lKYqFNMmZUwpwObMYti08lvX1Z0_JOnKl9I";
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imagesLoaded() {
  numberOfImagesLoaded++;
  if (numberOfImagesLoaded === totalImages) {
    ready = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    loader.hidden = true;
  }
}

// set attributes using a helper function
function setAttributes(element, attributes) {
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}

//add the photos to the dom
function displayPhotos() {
  numberOfImagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach(photo => {
    const anchorTag = document.createElement("a");
    setAttributes(anchorTag, {
      href: photo.links.html,
      target: "_blank",
    });
    const imageTag = document.createElement("img");
    setAttributes(imageTag, {
      src: `${photo.urls.raw}&crop=entropy&fit=max&fm=webp&q=50&w=1080`,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    imageTag.addEventListener("load", imagesLoaded);
    anchorTag.appendChild(imageTag);
    imageContainer.appendChild(anchorTag);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//on load
getPhotos();
