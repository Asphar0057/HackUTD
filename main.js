import * as THREE from 'three';

function createScene(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight / 4, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}

function loadTexture(url) {
  const loader = new THREE.TextureLoader();
  return loader.load(url);
}

function createFallingElement(texture, scene) {
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const element = new THREE.Mesh(geometry, material);

  // Randomize initial position and speed
  element.position.set(Math.random() * 200 - 100, Math.random() * 200 - 50, 0);
  element.fallingSpeed = 0.3 + Math.random() * 0.5; // Randomized speed
  element.driftSpeed = (Math.random() - 0.5) * 0.2; // Randomized horizontal drift

  scene.add(element);
  return element;
}

// Spring: Falling Flowers
const springContainer = document.getElementById('spring');
const spring = createScene(springContainer);
spring.camera.position.setZ(100);

const flowerTexture = loadTexture('images/flower.png');
const flowers = Array(50).fill().map(() => createFallingElement(flowerTexture, spring.scene));

function animateSpring() {
  requestAnimationFrame(animateSpring);
  flowers.forEach(flower => {
    flower.position.y -= flower.fallingSpeed;
    flower.position.x += flower.driftSpeed;

    // Reset position when out of bounds
    if (flower.position.y < -100) {
      flower.position.y = 100;
      flower.position.x = Math.random() * 200 - 100;
    }
  });
  spring.renderer.render(spring.scene, spring.camera);
}

animateSpring();

// Summer: Rotating Sun Rays
const summerContainer = document.getElementById('summer');
const summer = createScene(summerContainer);
summer.camera.position.setZ(100);

const sunrayTexture = loadTexture('images/sunray.png');
const sunRays = Array(10).fill().map(() => createFallingElement(sunrayTexture, summer.scene));

function animateSummer() {
  requestAnimationFrame(animateSummer);
  sunRays.forEach(ray => {
    ray.rotation.z += 0.005 + Math.random() * 0.005;
    ray.position.y -= ray.fallingSpeed;
    ray.position.x += ray.driftSpeed;

    // Reset position when out of bounds
    if (ray.position.y < -100) {
      ray.position.y = 100;
      ray.position.x = Math.random() * 200 - 100;
    }
  });
  summer.renderer.render(summer.scene, summer.camera);

  
}

animateSummer();

// Autumn: Falling Leaves
const autumnContainer = document.getElementById('autumn');
const autumn = createScene(autumnContainer);
autumn.camera.position.setZ(100);

const leafTexture = loadTexture('images/leaf.png');
const leaves = Array(50).fill().map(() => createFallingElement(leafTexture, autumn.scene));

function animateAutumn() {
  requestAnimationFrame(animateAutumn);
  leaves.forEach(leaf => {
    leaf.position.y -= leaf.fallingSpeed;
    leaf.position.x += leaf.driftSpeed;
    leaf.rotation.z += (Math.random() - 0.5) * 0.01;

    // Reset position when out of bounds
    if (leaf.position.y < -100) {
      leaf.position.y = 100;
      leaf.position.x = Math.random() * 200 - 100;
    }
  });
  autumn.renderer.render(autumn.scene, autumn.camera);
}

animateAutumn();

// Winter: Falling Snowflakes
const winterContainer = document.getElementById('winter');
const winter = createScene(winterContainer);
winter.camera.position.setZ(100);

const snowflakeTexture = loadTexture('images/snowflake.png');
const snowflakes = Array(50).fill().map(() => createFallingElement(snowflakeTexture, winter.scene));

function animateWinter() {
  requestAnimationFrame(animateWinter);
  snowflakes.forEach(snowflake => {
    snowflake.position.y -= snowflake.fallingSpeed;
    snowflake.position.x += snowflake.driftSpeed;
    snowflake.rotation.z += (Math.random() - 0.5) * 0.01;

    // Reset position when out of bounds
    if (snowflake.position.y < -100) {
      snowflake.position.y = 100;
      snowflake.position.x = Math.random() * 200 - 100;
    }
  });
  winter.renderer.render(winter.scene, winter.camera);
}

animateWinter();

function fadeOut(event) {
  event.preventDefault(); // Prevent immediate navigation
  document.body.classList.add('fade-out'); // Add the fade-out class
  setTimeout(() => {
    window.location.href = event.target.href; // Navigate after fade-out
  }, 800); // Adjust delay to match the CSS transition duration
}

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const weatherText = document.getElementById('weather-text');
  weatherText.addEventListener('click', replaceWithSearchBox);
});

function replaceWithSearchBox() {
  const container = document.getElementById('weather-container');

  // Create the input box
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'city-input';
  input.placeholder = 'Enter city name';
  input.style.padding = '10px';
  input.style.fontSize = '1.2rem';

  // Create the search button
  const button = document.createElement('button');
  button.textContent = 'Search';
  button.style.marginLeft = '10px';
  button.onclick = redirectToResultPage;

  // Clear the container and add the new elements
  container.innerHTML = '';
  container.appendChild(input);
  container.appendChild(button);
}

// Function to redirect to result.html with the city name as a query parameter
function redirectToResultPage() {
  const city = document.getElementById('city-input').value;
  if (city) {
    window.location.href = `result.html?city=${encodeURIComponent(city)}`;
  } else {
    alert('Please enter a city name.');
  }
}


