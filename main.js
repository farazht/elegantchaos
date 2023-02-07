// set up canvas
const screenWidth = screen.width, 
      screenHeight = screen.height,
      canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      menu = document.getElementById("menu"),
      bottom = document.getElementById("bottom");
canvas.width = screenWidth;
canvas.height = screenHeight;
ctx.translate(canvas.width / 2, canvas.height / 2);

bottom.style.display = "none";
let running = false;

function display(x_func_raw, y_func_raw, x_scale, y_scale, x_offset, y_offset, point_size, t_initial, t_final, t_rate, num_points, trail_length, color_scheme, connect_trail) {
    running = true;
    bottom.style.display = "block";
    menu.style.display = "none";

    // write x_func and y_func on document
    document.getElementById("x_func").innerHTML = x_func_raw;
    document.getElementById("y_func").innerHTML = y_func_raw;

    // compile x_func and y_func
    let x_func = math.compile(x_func_raw);
    let y_func = math.compile(y_func_raw);

    // initialize t
    let t = t_initial;

    // applies x_func to x pos and y_func to y pos, returns new position
    function next(pos, t) {
        let x = pos[0];
        let y = pos[1];
        return [x_func.evaluate({x: x, y: y, t: t}), y_func.evaluate({x: x, y: y, t: t})];
    }

    // make 2d array of n points at one time instance (t): [[x1, y1], [x2, y2], ...]
    function makeTimeInstance(t, n) {
        let output = [];

        // initialize position to [t, t]
        let pos = [t, t];

        // make n points from t to t + n*dt
        for (let i = 0; i < n; i++) {
            pos = next(pos, t);
            output.push(pos);
        }

        // return 2d array of points
        return output;
    }

    // main loop
    let currentTimeInstances = [];
    window.mainLoop = setInterval(() => {
        // stop loop if t_final is reached
        if (t >= t_final) {
            clearInterval(mainLoop);
            running = false;
            bottom.style.display = "none";
            menu.style.display = "flex"
        }

        // create constantly updating array of time instances, for the trail (length = trail_length)
        if (currentTimeInstances.length < trail_length) {
            currentTimeInstances.unshift(makeTimeInstance(t, num_points));
        } else {
            currentTimeInstances.unshift(makeTimeInstance(t, num_points));
            currentTimeInstances.pop();
        }

        // clear canvas
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        
        if (connect_trail == "false") { // draws points alone
            for (let i = 0; i < currentTimeInstances.length; i++) {
                for (let j = 0; j < currentTimeInstances[i].length; j++) {
                    ctx.fillStyle = toColor(j, color_scheme);
                    ctx.beginPath();
                    ctx.arc(currentTimeInstances[i][j][0] * x_scale - x_offset, currentTimeInstances[i][j][1] * y_scale - y_offset, point_size, 0, 2 * Math.PI);
                    ctx.fill();
                    // ctx.fillRect(currentlyDisplayed[i][j][0] * x_scale - x_offset, currentlyDisplayed[i][j][1] * y_scale - y_offset, point_size, point_size, );
                }
            }
        } else { // connects trail with bezier curve
            let grouped = crossArray(currentTimeInstances);
            for (let i = 0; i < grouped.length; i++) {
                ctx.strokeStyle = toColor(i, color_scheme);
                bezierCurveThrough(ctx, grouped[i].map((point) => [point[0] * x_scale - x_offset, point[1] * y_scale +-y_offset]), 0.25, point_size);
            } 
        }

        // increment t, display t
        t += t_rate;
        document.getElementById("t").innerHTML = customRound(t, 8);
    }, 10);
}

// gets points with same index from each array in input array, returns array of arrays of points
function crossArray(inputArray) {
    let outputArray = [];
    for (let i = 0; i < inputArray[0].length; i++) {
      let innerArray = [];
      for (let j = 0; j < inputArray.length; j++) {
        if (Array.isArray(inputArray[j][i])) {
          innerArray.push(inputArray[j][i]);
        }
      }
      outputArray.push(innerArray);
    }
    return outputArray;
}

// function to generate "random" color from number, consistent for same number, optional color scheme (0 = random)
function toColor(num, scheme) {
    // generate random rgb values
    let r = Math.round((num * 123) % 255);
    let g = Math.round((num * 473) % 255);
    let b = Math.round((num * 399) % 255);
    
    // make sure color is not too dark
    if (r < 50 && g < 50 && b < 50) {
        r += 100;
        g += 100;
        b += 100;
    }

    switch (scheme) {
        case 0: return "rgb(" + r + ", " + g + ", " + b + ")"; // rainbow
        case 1: return "rgb(" + r + ", " + 255 + ", " + 255 + ")"; // cyan
        case 2: return "rgb(" + r + ", " + 0 + ", " + 255 + ")"; // blue-purple-pink
        case 3: return "rgb(" + r + ", " + 255 + ", " + 0 + ")"; // green-yellow
        case 4: return "rgb(" + 255 + ", " + g + ", " + 255 + ")"; // magenta
        case 5: return "rgb(" + 0 + ", " + g + ", " + 255 + ")"; // blue-cyan
        case 6: return "rgb(" + 255 + ", " + g + ", " + 0 + ")"; // red-orange-yellow
        case 7: return "rgb(" + 255 + ", " + 255 + ", " + b + ")"; // yellow
        case 8: return "rgb(" + 255 + ", " + 0 + ", " + b + ")"; // red-magenta
        case 9: return "rgb(" + 0 + ", " + 255 + ", " + b + ")"; // green-cyan
        case 10: return "rgb(" + 255 + ", " + 255 + ", " + 255 + ")"; // white
        case 11: return "rgb(" + 60 + ", " + 60 + ", " + 60 + ")"; // black
        default: return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

// function to round to specified decimals
function customRound(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// ===================
// EVENT LISTENERS
// ===================

document.getElementById("randomPreset").addEventListener("click", () => {
    let preset = window.presets[Math.floor(Math.random() * window.presets.length)];
    document.getElementById("x_func_input").value = preset.x_func;
    document.getElementById("y_func_input").value = preset.y_func;
    document.getElementById("x_scale_input").value = preset.x_scale;
    document.getElementById("y_scale_input").value = preset.y_scale;
    document.getElementById("x_offset_input").value = preset.x_offset;
    document.getElementById("y_offset_input").value = preset.y_offset;
    document.getElementById("point_size_input").value = preset.point_size;
    document.getElementById("t_initial_input").value = preset.t_initial;
    document.getElementById("t_final_input").value = preset.t_final;
    document.getElementById("t_rate_input").value = preset.t_rate;
    document.getElementById("num_points_input").value = preset.num_points;
    document.getElementById("trail_length_input").value = preset.trail_length;
    document.getElementById("color_scheme_input").value = preset.color_scheme;
    document.getElementById("connect_trail_input").value = preset.connect_trail;
});

document.getElementById("randomX").addEventListener("click", () => {
    let terms = ["x^2", "y^2", "t^2", "x", "y", "t", "x*t", "y*t", "x*y"],
        connectors = [" + ", " - "],
        random_x_func = "",
        x_length = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < x_length; i++) {
        random_x_func += terms[Math.floor(Math.random() * terms.length)] + connectors[Math.floor(Math.random() * connectors.length)];
    }

    random_x_func += terms[Math.floor(Math.random() * terms.length)];

    document.getElementById("x_func_input").value = random_x_func;
});

document.getElementById("randomY").addEventListener("click", () => {
    let terms = ["x^2", "y^2", "t^2", "x", "y", "t", "x*t", "y*t", "x*y"],
        connectors = [" + ", " - "],
        random_y_func = "",
        y_length = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < y_length; i++) {
        random_y_func += terms[Math.floor(Math.random() * terms.length)] + connectors[Math.floor(Math.random() * connectors.length)];
    }

    random_y_func += terms[Math.floor(Math.random() * terms.length)];

    document.getElementById("y_func_input").value = random_y_func;
});

document.getElementById("begin").addEventListener("click", function() {
    if (running) return;

    // get values from input fields
    let x_func_raw = document.getElementById("x_func_input").value;
    let y_func_raw = document.getElementById("y_func_input").value;
    let x_scale = parseFloat(document.getElementById("x_scale_input").value);
    let y_scale = parseFloat(document.getElementById("y_scale_input").value);
    let x_offset = parseFloat(document.getElementById("x_offset_input").value);
    let y_offset = parseFloat(document.getElementById("y_offset_input").value);
    let point_size = parseFloat(document.getElementById("point_size_input").value);
    let t_initial = parseFloat(document.getElementById("t_initial_input").value);
    let t_final = parseFloat(document.getElementById("t_final_input").value);
    let t_rate = parseFloat(document.getElementById("t_rate_input").value);
    let num_points = parseFloat(document.getElementById("num_points_input").value);
    let trail_length = parseFloat(document.getElementById("trail_length_input").value);
    let color_scheme = parseFloat(document.getElementById("color_scheme_input").value);
    let connect_trail = document.getElementById("connect_trail_input").value;

    // display
    display(x_func_raw, y_func_raw, x_scale, y_scale, x_offset, y_offset, point_size, t_initial, t_final, t_rate, num_points, trail_length, color_scheme, connect_trail);
});
document.getElementById("stop").addEventListener("click", function() {
    clearInterval(mainLoop);
    running = false;
    bottom.style.display = "none";
    menu.style.display = "flex";
});

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 27) {
        if (running) {
            clearInterval(mainLoop);
            running = false;
            bottom.style.display = "none";
            menu.style.display = "flex"; 
        }
    }
});