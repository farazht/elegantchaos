# elegant**chaos**

## Introduction

*elegant**chaos*** is a web-based tool for visualising chaotic mathematical systems. It was created with simplicity and elegance in mind, while also allowing for extensive customization and interactivity.

This project was heavily inspired by [CodeParade's](https://www.youtube.com/@CodeParade) exploration of [Chaos Equations](https://www.youtube.com/watch?v=fDSIRXmnVvk), and it employs many of the same mathematical methods.

## Usage

Naturally, these chaos equations lead to infinity with only a small change in the initial conditions. As a result, it can be difficult to find inputs that produce interesting outputs. The application provides a few tools to help with this.

The following settings can be helpful for quickly evaluating the behavior of a system:

`Import Code: Ozs0MDA7NDAwOzA7MDsxOy0xOzE7MC4wMDE7NTAwOzU7MDtmYWxzZQ`

- *x_func* and *y_func*: These functions are what determine the behavior. Try whatever you'd like, just base the function on the terms *x*, *y*, and *t*. The functions are evaluated using [math.js](https://mathjs.org/), so you can use any of the functions it provides.
    - e.g. `x^2 + y^2 - x*y + t`
    - e.g. `t^2 - x^2 + x*t - y*t + t`
    - e.g. `y*t - x`
    - e.g. `y^2 + x*t - y*t - y + x`
- *x_scale*: 300-500
- *y_scale*: 300-500
- *x_offset*: 0
- *y_offset*: 0
- *point_size*: 1
- *t_initial*: -1
- *t_final*: 1
- *t_rate*: 0.001
- *num_points*: 500-1000
- *trail_length*: 5-10
- *color_scheme*: any
- *connect_trail*: false

From there, if you see something interesting, you can easily adjust the scale and offset to fit it to your screen, and adjust the *t* settings to get a better look at the behavior. 

Remember, you can slow down time as much as you'd like, and it will almost certainly still look interesting.

## Explanation

The program starts with just a single point, initialized at x = t_initial and y = t_initial. 

> [x<sub>1</sub>, y<sub>1</sub>]

Then, this point is passed through the functions *x_func* and *y_func* to produce a new point. 

> [x<sub>2</sub>, y<sub>2</sub>] = [x_func(x<sub>1</sub>), y_func(y<sub>1</sub>)]

This is repeated for *num_points* iterations, and a 2d array is produced. In the code, this is called a *timeInstance* — partly because it represents all points at a single point in time, and partly because it sounds cool.

> timeInstance = [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]]

This process is repeated for every *t* value between *t_initial* and *t_final*, with a step size of *t_rate*. The currently visible *timeInstances* are stored in a rolling 3d array named *currentTimeInstances*, fixed to a length of *trail_length*.

> currentTimeInstances = [

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial)

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial + t_rate)

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial + t_rate*2)

> ..., [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_final)

> ]

Next, all other settings are applied. The points are grouped by their index in their respective *timeInstance*. These groups of points represent points in the same trail — they move in the same path, and will generally remain in close proximity.

> currentTimeInstances = [

> [**[x<sub>1</sub>, y<sub>1</sub>]**, [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial)

> [**[x<sub>1</sub>, y<sub>1</sub>]**, [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial + t_rate)

> [**[x<sub>1</sub>, y<sub>1</sub>]**, [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]], (at t_initial + t_rate*2)

> ..., [**[x<sub>1</sub>, y<sub>1</sub>]**, [x<sub>2</sub>, y<sub>2</sub>], [x<sub>3</sub>, y<sub>3</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_final)

> ]

The points bolded above will display in the same color. This is the same for every other index, and gives the illusion of trails. If *connect_trail* is true, the points will be connected by [bezier curves](https://github.com/dobarkod/canvas-bezier-multiple).

Finally, the points are scaled, offset, and drawn to the screen.

---

### Music: 

Erik Satie - Gymnopédie No.1

Frédéric Chopin - Nocturne op.9 No.2

Claude Debussy - Clair de lune


