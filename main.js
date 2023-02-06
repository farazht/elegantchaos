// set up canvas
const screenWidth = screen.width, 
      screenHeight = screen.height,
      canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");
canvas.width = screenWidth;
canvas.height = screenHeight;
ctx.translate(canvas.width / 2, canvas.height / 2);

const presets = [
    {
        x_func: "-x^2 - t^2 + x*t - y*t - x",
        y_func: "-x^2 + t^2 + x*t - x - y",
        x_scale: 200, 
        y_scale: 200,
        x_offset: -30,
        y_offset: -75,
        point_size: 1,
        t_initial: -1,
        t_final: 0.7,
        t_rate: 0.0007,
        num_points: 500,
        trail_length: 5,
        color_scheme: 0,
        connect_trail: false,
    },
    {
        x_func: "t^2 - x*y + t",
        y_func: "-x*y + x*t + y + t",
        x_scale: 300,
        y_scale: 300,
        x_offset: -100,
        y_offset: 200,
        point_size: 2,
        t_initial: 0,
        t_final: 0.6,
        t_rate: 0.0002,
        num_points: 500,
        trail_length: 5,
        color_scheme: 0,
        connect_trail: false,
    }, 
    {
        x_func: "x^2 - x*t + y*t - x",
        y_func: "-y^2 - t^2 - x*y - x*t - y*t - y",
        x_scale: 400,
        y_scale: 400,
        x_offset: 200,
        y_offset: -150,
        point_size: 1,
        t_initial: 0.15,
        t_final: 0.56,
        t_rate: 0.0002,
        num_points: 1000,
        trail_length: 5,
        color_scheme: 0,
        connect_trail: false,
    },
]

function displayRandom() {
    // choose random preset
    let chosenPreset = presets[Math.floor(Math.random() * presets.length)]; 

    // get values from chosen random preset
    let x_func_raw = chosenPreset.x_func;
    let y_func_raw = chosenPreset.y_func;
    let x_scale = chosenPreset.x_scale;
    let y_scale = chosenPreset.y_scale;
    let x_offset = chosenPreset.x_offset;
    let y_offset = chosenPreset.y_offset;
    let point_size = chosenPreset.point_size;
    let num_points = chosenPreset.num_points;
    let t_initial = chosenPreset.t_initial;
    let t_final = chosenPreset.t_final;
    let t_rate = chosenPreset.t_rate;
    let trailLength = chosenPreset.trail_length;
    let color_scheme = chosenPreset.color_scheme;
    let connect_trail = chosenPreset.connect_trail;

    // display
    display(x_func_raw, y_func_raw, x_scale, y_scale, x_offset, y_offset, point_size, num_points, t_initial, t_final, t_rate, trailLength, color_scheme, connect_trail);
}

let running = false;
function display(x_func_raw, y_func_raw, x_scale, y_scale, x_offset, y_offset, point_size, num_points, t_initial, t_final, t_rate, trailLength, color_scheme, connect_trail) {
    running = true;

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
    function make2DArray(t, n) {
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
    let currentlyDisplayed = [];
    let mainLoop = setInterval(() => {
        // stop loop if t_final is reached
        if (t >= t_final) {
            clearInterval(mainLoop);
            running = false;
        }

        // create constantly updating array of time instances, for the trail (length = trailLength)
        if (currentlyDisplayed.length < trailLength) {
            currentlyDisplayed.unshift(make2DArray(t, num_points));
        } else {
            currentlyDisplayed.unshift(make2DArray(t, num_points));
            currentlyDisplayed.pop();
        }

        // clear canvas
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        
        if (!connect_trail) { // draws points alone
            for (let i = 0; i < currentlyDisplayed.length; i++) {
                for (let j = 0; j < currentlyDisplayed[i].length; j++) {
                    ctx.fillStyle = toColor(j, color_scheme);
                    ctx.fillRect(currentlyDisplayed[i][j][0] * x_scale - x_offset, currentlyDisplayed[i][j][1] * y_scale - y_offset, point_size, point_size, );
                }
            }
        } else { // connects trail with bezier curve
            let grouped = crossArray(currentlyDisplayed);
            for (let i = 0; i < grouped.length; i++) {
            ctx.strokeStyle = toColor(i, color_scheme);
            bezierCurveThrough(ctx, grouped[i].map((point) => [point[0] * x_scale - x_offset, point[1] * y_scale +-y_offset]), 0.25);
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
    
    // return color based on scheme
    if (scheme == 0) {return "rgb(" + r + ", " + g + ", " + b + ")";} // rainbow
    else if (scheme == 1) {return "rgb(" + r + ", " + 255 + ", " + 255 + ")";} // cyan
    else if (scheme == 2) {return "rgb(" + r + ", " + 0 + ", " + 255 + ")";} // blue-purple-pink
    else if (scheme == 3) {return "rgb(" + r + ", " + 255 + ", " + 0 + ")";} // green-yellow
    else if (scheme == 4) {return "rgb(" + 255 + ", " + g + ", " + 255 + ")";} // magenta
    else if (scheme == 5) {return "rgb(" + 0 + ", " + g + ", " + 255 + ")";} // blue-cyan
    else if (scheme == 6) {return "rgb(" + 255 + ", " + g + ", " + 0 + ")";} // red-orange-yellow
    else if (scheme == 7) {return "rgb(" + 255 + ", " + 255 + ", " + b + ")";} // yellow
    else if (scheme == 8) {return "rgb(" + 255 + ", " + 0 + ", " + b + ")";} // red-magenta
    else if (scheme == 9) {return "rgb(" + 0 + ", " + 255 + ", " + b + ")";} // green-cyan
    else if (scheme == 10) {return "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";} // white
    else if (scheme == 11) {return "rgb(" + 20 + ", " + 20 + ", " + 20 + ")";} // black
}

// function to round to specified decimals
function customRound(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
