window.onload = function () {
    window.canvas = document.querySelector('canvas');
    window.context = canvas.getContext('2d');

    window.x = 100; //координаты
    window.y = 100; //координаты
    window.V_x = 0; //скорость
    window.V_y = 0; //скорость
    window.mass = 100;
    window.direction = 0;
    window.move_direction = 0; //разворачивание в процессе
    window.move = 0;
    window.g = 5;
    window.time = 1;

    requestAnimationFrame(drawScene);

    triangle = create_triangle();
    requestAnimationFrame(triangle);

    document.getElementById('add_ball').onclick = function () {
        var ball = create_ball();
        requestAnimationFrame(ball);
    };

    function x_speed() {
        window.V_x = window.V_x + x_Force() / window.mass * window.time;
        return window.V_x;
    }

    function y_speed() {
        window.V_y = window.V_y + y_Force() / window.mass * window.time;
        return window.V_y;
    }

    window.x_delta = function () {
        return x_speed() * window.time;
    };

    window.y_delta = function () {
        return y_speed() * window.time;
    };

    var canvas1 = document.getElementById('test');
    canvas1.onkeydown = function (e) {
        if (e.keyCode == 87) {
            //w
            console.log('w down');
            window.move = 50;
        }
        if (e.keyCode == 83) {
            //s
            console.log('s down');
            window.move = -50;
        }
        if (e.keyCode == 68) {
            // d
            console.log('d down');
            window.move_direction = 5;
            // window.x = window.x + 5;
        }
        if (e.keyCode == 65) {
            // a
            console.log('a down');
            window.move_direction = -5;
            // window.x = window.x - 5;
        }
    };
    canvas1.onkeyup = function (e) {
        if (e.keyCode == 87) {
            console.log('w up');
            window.move = 0;
        }
        if (e.keyCode == 83) {
            //s
            console.log('s up');
            window.move = 0;
        }
        if (e.keyCode == 68) {
            // d
            console.log('d up');
            window.move_direction = 0;
        }
        if (e.keyCode == 65) {
            // a
            window.move_direction = 0;
            console.log('a up');
            // window.direction = window.direction - 10;
            // if (window.direction <= 0) {
            //     window.direction = 360;
            // }
            // window.x = window.x - 5;
        }
        console.log('direction ' + window.direction);
    }
};

function x_Force() {
    return window.move * Math.sin(alpha) * -1;
}

function y_Force() {
    return window.move * Math.cos(alpha) + window.g;
}

function drawScene() {
    window.context.clearRect(0, 0, 1800, 900);

    window.context.beginPath();
    window.context.moveTo(0, 0);
    window.context.lineTo(1800, 0);
    window.context.lineTo(1800, 900);
    window.context.lineTo(0, 900);
    window.context.lineTo(0, 0);
    window.context.strokeStyle = 'black';
    window.context.stroke();

    requestAnimationFrame(drawScene)
}

function create_ball() {
    var ball_id = Math.random() * 100;
    var livetime = 10000;
    var color = getRandomColor();
    var x = Math.random() * 1800;
    var y = Math.random() * 900;

    return function ball() {
        context.beginPath();
        context.arc(x, y, 20, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.fillStyle = color;
        context.fill();
        context.stroke();
        livetime = livetime - 1;
        var animation_id = requestAnimationFrame(ball);
        if (livetime < 0) {
            cancelAnimationFrame(animation_id);
        }
    }
}

function print_info() {
    window.context.font = "15px Arial";
    window.context.strokeText('X: ' + (window.x).toFixed(2) + ' Y:' + (window.y).toFixed(2), 1600, 800);
    window.context.strokeText('X speed: ' + (window.V_x).toFixed(2) + ' Y speed:' + (window.V_y).toFixed(2), 1600, 820);
    window.context.strokeText('X force: ' + (x_Force()).toFixed(2) + ' Y force:' + (y_Force()).toFixed(2), 1600, 840);
    window.context.strokeText('alpha: ' + (window.direction), 1600, 860);
}

function create_triangle() {
    return function triangle() {

        window.direction = window.direction + window.move_direction;
        if (window.direction > 360) {
            window.direction = window.direction - 360;
        }

        if (window.direction < -360) {
            window.direction = window.direction + 360;
        }

        height = 30;
        width = 15;
        context.beginPath();
        alpha = window.direction * Math.PI / 180;
        console.log('direction: ' + direction);

        // console.log('move: ' + window.move);
        var delta_x = window.move * Math.sin(alpha) * -1;
        var delta_y = window.move * Math.cos(alpha);
        // console.log('delta x: ' + delta_x);
        // console.log('delta y: ' + delta_y);

        window.x = window.x + window.x_delta();
        window.y = window.y + window.y_delta();

        A_x = 0;
        A_y = height;

        A_x_rotated = A_x * Math.cos(alpha) - A_y * Math.sin(alpha) + window.x;
        A_y_rotated = A_x * Math.sin(alpha) + A_y * Math.cos(alpha) + window.y;

        B_x = width;
        B_y = -height;

        B_x_rotated = B_x * Math.cos(alpha) - B_y * Math.sin(alpha) + window.x;
        B_y_rotated = B_x * Math.sin(alpha) + B_y * Math.cos(alpha) + window.y;

        C_x = -width;
        C_y = -height;

        C_x_rotated = C_x * Math.cos(alpha) - C_y * Math.sin(alpha) + window.x;
        C_y_rotated = C_x * Math.sin(alpha) + C_y * Math.cos(alpha) + window.y;

        context.moveTo(A_x_rotated, A_y_rotated);
        context.lineTo(B_x_rotated, B_y_rotated);
        context.lineTo(C_x_rotated, C_y_rotated);
        context.lineTo(A_x_rotated, A_y_rotated);
        context.strokeStyle = 'black';
        context.fillStyle = 'black';
        context.fill();
        context.stroke();

        print_info();

        requestAnimationFrame(triangle);

    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}