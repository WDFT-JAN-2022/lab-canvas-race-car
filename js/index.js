window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const car = new Image();
  car.src = "../images/car.png";
  // car.onload = () => {
  //   // ctx.drawImage(car, canvas.width / 2, canvas.height - 100, 50, 90);
  // };

  class Player {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height - 100;
      this.image = car;
    }

    move(direction) {
      switch (direction) {
        case "ArrowLeft":
          this.x -= 15;
          break;
        case "ArrowRight":
          this.x += 15;
          break;
      }
    }
  }

  const driver = new Player();

  //Movements
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("ArrowLeft");
        break;
      case "ArrowRight":
        driver.move("ArrowRight");
        break;
    }
  });

  function startGame() {
    animate();
  }

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(driver.image, driver.x, driver.y, 50, 90);
  }
};
