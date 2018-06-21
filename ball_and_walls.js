window.onload = function () {
    window.canvas = document.querySelector('canvas');
    window.context = canvas.getContext('2d');

    window.F = 10;
    window.G = 10;

    window.radius = 20;
    window.timeStep = 0.04;
    window.color = getRandomColor();
    window.balls = [];
    for(i=0;i<10;i++) {
        var ball = {
            x: Math.random()*100+20,
            y: Math.random()*100+20,
            xSpeed: Math.random()*5+4,
            ySpeed: Math.random()*2+10,
            color: getRandomColor()
        };
        var newLength = window.balls.push(ball);
    }
    console.log(newLength);

    requestAnimationFrame(drawScene);
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawBorder(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(800, 0);
    context.lineTo(800, 600);
    context.lineTo(0, 600);
    context.lineTo(0, 0);
    context.strokeStyle = 'black';
    context.stroke();
}

function drawCircle(context, ball) {
    context.beginPath();
    context.arc(ball.x, ball.y, window.radius, 0, 2 * Math.PI);
    context.strokeStyle = ball.color;
    context.fillStyle = ball.color;
    context.fill();
    context.stroke();
}

function clearCanvas(context) {
    context.clearRect(0, 0, 800, 600);
}

function getNewCoordinateY(ball) {
    ball.ySpeed = (ball.ySpeed + getSpeedDelta());
    ball.y = ball.y + ball.ySpeed * window.timeStep;
    if (ball.y > (600 - window.radius)) {
        ball.y = 600 - window.radius;
    }
}

function getNewCoordinateX(currentCoordinate, speed) {
    return currentCoordinate  + speed;
}

function getSpeedDelta() {
    // v = a * time
    return window.G * window.timeStep;
}

function drawScene() {

    clearCanvas(context);
    drawBorder(context);
    // console.log(window.balls.length)
    window.balls.forEach(function (ball, i, balls) {
        ball.x = getNewCoordinateX(ball.x, ball.xSpeed);
        getNewCoordinateY(ball);
        if ((ball.y + window.radius) >= 600 || (ball.y - window.radius) <= 0) {
            ball.ySpeed = ball.ySpeed * 0.9;
            ball.xSpeed = ball.xSpeed * 0.9;
            ball.ySpeed = ball.ySpeed * -1;
            getNewCoordinateY(ball);
        }
        if ((ball.x + window.radius) >= 800 || (ball.x - window.radius) <= 0) {
            ball.xSpeed = ball.xSpeed * -1;
            ball.x = getNewCoordinateX(ball.x, ball.xSpeed);
        }
        drawCircle(context, ball);
    });
    requestAnimationFrame(drawScene);
}