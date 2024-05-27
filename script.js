document.addEventListener("DOMContentLoaded", function () {
  var player = document.getElementById("player");
  var obstacles = [];

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
      var gamma = event.gamma;
      var screenWidth = window.innerWidth;
      var playerWidth = parseInt(player.offsetWidth);
      var newPosition = screenWidth / 2 + gamma * (screenWidth / 90);

      newPosition = Math.max(newPosition, playerWidth / 2);
      newPosition = Math.min(newPosition, screenWidth - playerWidth / 2);

      player.style.left = newPosition + "px";
    });
  } else {
    alert("Deze browser ondersteunt geen Device Orientation API.");
  }

  function createObstacle() {
    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.random() * (window.innerWidth - 30) + "px";
    document.body.appendChild(obstacle);
    obstacles.push(obstacle);

    var obstacleInterval = setInterval(function () {
      var obstacleBottom = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("top")
      );
      obstacle.style.top = obstacleBottom + 1 + "px";

      var playerRect = player.getBoundingClientRect();
      var obstacleRect = obstacle.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
      ) {
        gameOver();
      }

      if (obstacleBottom > window.innerHeight) {
        obstacle.remove();
        clearInterval(obstacleInterval);
      }
    }, 10);
  }

  function gameOver() {
    alert("Game Over!");
    window.location.reload();
  }

  setInterval(createObstacle, 3000);
});
