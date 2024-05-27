document.addEventListener("DOMContentLoaded", function () {
  // Variabelen voor de bal en het speelveld
  var ball = document.getElementById("ball");
  var container = document.querySelector(".container");
  var containerRect = container.getBoundingClientRect();

  // Variabelen voor de score en obstakels
  var score = 0;
  var obstacles = [];

  // Functie om de bal te bewegen op basis van de kanteling
  function moveBall(event) {
    var x = event.gamma; // Kanteling langs de x-as
    var y = event.beta; // Kanteling langs de y-as

    // Beweeg de bal op basis van de kanteling
    ball.style.left = containerRect.width / 2 + x + "px"; // Horizontale beweging
    ball.style.top = containerRect.height / 2 + y + "px"; // Verticale beweging

    // Controleer op botsingen met obstakels
    obstacles.forEach(function (obstacle) {
      var obstacleRect = obstacle.getBoundingClientRect();
      if (
        ball.getBoundingClientRect().left < obstacleRect.right &&
        ball.getBoundingClientRect().right > obstacleRect.left &&
        ball.getBoundingClientRect().top < obstacleRect.bottom &&
        ball.getBoundingClientRect().bottom > obstacleRect.top
      ) {
        // Botsing gedetecteerd
        gameOver();
      }
    });
  }

  // Functie om obstakels te maken en te laten bewegen
  function createObstacle() {
    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.random() * containerRect.width + "px";
    container.appendChild(obstacle);
    obstacles.push(obstacle);

    // Laat het obstakel bewegen
    var obstacleInterval = setInterval(function () {
      var obstacleBottom = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("bottom")
      );
      obstacle.style.bottom = obstacleBottom + 1 + "px";

      // Controleer of het obstakel buiten het speelveld valt
      if (obstacleBottom > containerRect.height) {
        clearInterval(obstacleInterval);
        container.removeChild(obstacle);
        obstacles.splice(obstacles.indexOf(obstacle), 1);
        score++; // Verhoog de score bij het passeren van een obstakel
      }
    }, 10);
  }

  // Functie voor het beëindigen van het spel
  function gameOver() {
    alert("Game Over! Je score is: " + score);
    window.location.reload(); // Herlaad de pagina om opnieuw te spelen
  }

  // Event listener voor device orientation
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", moveBall);
  } else {
    alert("Deze browser ondersteunt geen Device Orientation API.");
  }

  // Start het spel door obstakels te maken
  setInterval(createObstacle, 2000);
});
