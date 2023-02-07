# elegant**chaos**

## Introduction

*elegant**chaos*** is a browser application for visualizing chaotic mathematical systems. It was designed with simplicity and elegance in mind while allowing for a wide range of customization and interactivity.

This project was heavily inspired by [CodeParade's](https://www.youtube.com/@CodeParade) video on [Chaos Equations](https://www.youtube.com/watch?v=fDSIRXmnVvk), which used the same mathematical methods for the most part.

## Usage

Naturally, these chaos equations lead to infinity with only a small change in the initial conditions. As a result, finding inputs that produce interesting results can be difficult. The application provides a few tools to help with this.

The following settings can be helpful for quickly evaluating the behavior of a system:
- *x_func*: This is what determines the behaviour. Try whatever you'd like.
- *y_func*: This is what determines the behaviour. Try whatever you'd like.
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

Remember, you can slow down time as much as you'd like, and it will almost certainly still look cool.

## Explanation

The program starts with just a single point, initialized at x = t_initial and y = t_initial. 

> [x<sub>1</sub>, y<sub>1</sub>]

Then, this point is passed through the functions *x_func* and *y_func* to produce a new point. 

> [x<sub>2</sub>, y<sub>2</sub>] = [x_func(x<sub>1</sub>), y_func(y<sub>1</sub>)]

This is repeated for *num_points* iterations, and a 2d array is produced. In the code, this is called a *timeInstance* — partly because it represents all points at a single point in time, and partly because it sounded cool.

> timeInstance = [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]]

This process is repeated for every *t* value between *t_initial* and *t_final*, with a step size of *t_rate*. The currently visible *timeInstances* are stored in a rolling 3d array named *currentTimeInstances*, fixed to a length of *trail_length*.

> currentTimeInstances = [

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial)

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial + t_rate)

> [[x<sub>1</sub>, y<sub>1</sub>], [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial + t_rate*2)

> ... ]

Next, all other settings are applied. The points are grouped by their index in their respective *timeInstance*. These groups of points represent points in the same trail — they move in the same path, and will generally remain in close proximity.

> currentTimeInstances = [

> <mark>[[x<sub>1</sub>, y<sub>1</sub>]</mark>, [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial)

> <mark>[[x<sub>1</sub>, y<sub>1</sub>]</mark>, [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial + t_rate)

> <mark>[[x<sub>1</sub>, y<sub>1</sub>]</mark>, [x<sub>2</sub>, y<sub>2</sub>], ..., [x<sub>num_points</sub>, y<sub>num_points</sub>]] (at t_initial + t_rate*2)

> ... ]

The points highlighted above will display in the same color. This is the same for every other index, and gives the illusion of a colored trail. If *connect_trail* is true, the points will be connected by [bezier curves](https://github.com/dobarkod/canvas-bezier-multiple).

Finally, the points are scaled, offset, and drawn to the screen.



