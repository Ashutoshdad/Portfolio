// Function to open the navigation bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("content").classList.add("content-shift");
  document.getElementById("scale-text").classList.add("scale-text-shift");
}

// Function to close the navigation bar
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("content").classList.remove("content-shift");
  document.getElementById("scale-text").classList.remove("scale-text-shift");
}




// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store the particles
var particles = [];

// Function to create a new particle
function createParticle() {
  var particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5 + 1,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
    color: "#00FFFF"
  };
  particles.push(particle);
}

// Function to update the particles
function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Remove particles that are out of bounds
    if (
      particle.x < -particle.size ||
      particle.x > canvas.width + particle.size ||
      particle.y < -particle.size ||
      particle.y > canvas.height + particle.size
    ) {
      particles.splice(i, 1);
      i--;
      continue;
    }

    // Draw the particle
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 3);
    ctx.closePath();
    ctx.fill();

    // Connect particles with lines
    for (var j = i + 1; j < particles.length; j++) {
      var otherParticle = particles[j];
      connectParticles(particle, otherParticle);
    }
  }

  // Create new particles
  if (particles.length < 60) {
    for (var k = 0; k < 10; k++) {
      createParticle();
    }
  }

  // Call the update function again
  requestAnimationFrame(updateParticles);
}

// Function to connect two particles with a line
function connectParticles(particle1, particle2) {
  var dx = particle2.x - particle1.x;
  var dy = particle2.y - particle1.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  // Draw a line between the particles if they are close enough
  if (distance < 80) {
    ctx.strokeStyle = "rgba(255, 255, 255, " + (1 - distance / 80) + ")";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(particle1.x, particle1.y);
    ctx.lineTo(particle2.x, particle2.y);
    ctx.stroke();
  }
}

// Function to handle mouse movements
function handleMouse(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  // Update the particles' speed based on mouse position
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var dx = mouseX - particle.x;
    var dy = mouseY - particle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var forceX = dx / distance;
    var forceY = dy / distance;

    // Update particle speed
    particle.speedX += forceX * 0.020;
    particle.speedY += forceY * 0.020;
  }
}

// Event listener for mouse movements
document.addEventListener("mousemove", handleMouse);

// Start the animation
updateParticles();








const imageContainer = document.querySelector('.image-container');

function createImageLoop() {
  const images = imageContainer.querySelectorAll('img');
  const imageCount = images.length;

  // Clone the images and append them to the container
  for (let i = 0; i < imageCount; i++) {
    const clonedImage = images[i].cloneNode(true);
    imageContainer.appendChild(clonedImage);
  }

  // Start the animation after a short delay
  setTimeout(() => {
    const technologiesSection = document.querySelector('.technologies-container');
    technologiesSection.addEventListener('load', startAnimation());

  }, 2000);

}

function startAnimation() {
  const images = imageContainer.querySelectorAll('img');
  const imageCount = images.length;
  const imageWidth = images[0].offsetWidth;

  // Set the container width to accommodate all the images
  imageContainer.style.width = `${imageCount * imageWidth}px`;

  // Apply the animation to move the images
  imageContainer.style.animation = `slideImages ${imageCount * 2.5}s linear infinite`;
}

createImageLoop();

//load more
function showAllAchievements() {
  // Show the rest of the achievements
  var restAchievements = document.getElementById("restAchievements");
  restAchievements.style.display = "block";

  // Hide the "Show All Achievements" button after displaying all achievements
  var showAllButton = document.getElementById("showAllButton");
  showAllButton.style.display = "none";
}

function hideRestAchievements() {
  // Hide the rest of the achievements
  var restAchievements = document.getElementById("restAchievements");
  restAchievements.style.display = "none";

  // Show the "Show All Achievements" button again
  var showAllButton = document.getElementById("showAllButton");
  showAllButton.style.display = "block";
}





function startCountingWhenVisible(elementId, startValue, endValue, duration) {
  let isCounting = false;

  function countAnimation(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
      current += increment;
      element.innerHTML = current;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        clearInterval(timer);
        isCounting = false;
      }
    }, stepTime);
  }

  function startCounting() {
    if (!isCounting) {
      isCounting = true;
      let countElement = document.getElementById(elementId);
      countAnimation(countElement, startValue, endValue, duration);
    }
  }

  const card = document.getElementById(elementId);
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  });

  observer.observe(card);
}
// Start counting for "Hours Of Coding" card

startCountingWhenVisible('hours_coding_count', 0, 500, 7000);

// Start counting for "Won Science Competition" card

startCountingWhenVisible('science_competition_count', 0, 20, 7000);

startCountingWhenVisible('competition_count', 0, 10, 7000);

startCountingWhenVisible('compe_count', 0, 1000, 6000);


