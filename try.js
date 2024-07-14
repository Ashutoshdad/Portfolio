function countAnimation(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
      current += increment;
      element.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    let countElement = document.getElementById('count');
    countAnimation(countElement, 0, 1000, 1000); // Start counting from 0 to 1000 in 3 seconds
  });
  