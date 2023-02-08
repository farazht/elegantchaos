const presets = [
    "dCAtIHgqeSArIHleMiArIHReMiArIHleMjt4IC0geSp0ICsgeSp0ICsgdCAtIHleMiArIHleMjs0MDA7NDAwOzUwOy01MDsxOy0wLjU7LTAuMTc7MC4wMDAwNTs1MDA7NTswO2ZhbHNl", // squareish outline
    "dF4yIC0geV4yIC0geCp5ICAtIHkqdCAtIHg7dF4yIC0geCp0IC15OzE1MDsxNTA7MDs1MDsxOzA7MC40MzswLjAwMDE7NTAwOzU7MDtmYWxzZQ", // S-shaped spiral
    "LXheMiAtIHReMiArIHgqdCAtIHkqdCAtIHg7LXheMiArIHReMiArIHgqdCAtIHggLSB5OzIwMDsyMDA7LTMwOy03NTsxOy0xOzAuNzswLjAwMDc7NTAwOzU7MDtmYWxzZQ", // 3d shape outline into spiral
    "eF4yIC0geCp0ICsgeSp0IC0geDsteV4yIC0gdF4yIC0geCp5IC0geCp0IC0geSp0IC0geTs0MDA7NDAwOzIwMDstMTUwOzE7MC4xNTswLjU2OzAuMDAwMjsxMDAwOzU7NTtmYWxzZQ", // blue waves 
    "LXheMiArIHleMiArIHReMiAtIHgqeSArIHkqdCAtIHQ7eV4yIC0geCArIHQ7NDUwOzQ1MDswOzA7MTstMC4xNjstMC4xMTswLjAwMDAyOzQwMDsxMDswO2ZhbHNl", // magic bean --> double spiral
    "eF4yICsgeV4yIC0geCp5ICsgeSp0IC0gdDt5XjIgLSB4ICsgdDs0NTA7NDUwOzUwOzEwMDsxOzA7MC40ODswLjAwMDI7NTAwOzg7MDtmYWxzZQ", // slow outwards spiral into jellyfish
    "eF4yICsgdF4yICsgeV4yIC0geCp0IC0geCArIHk7eF4yICsgeCp0ICsgeSArIHQ7MzUwOzM1MDswOy0yNTA7MTstMC40OzAuMTswLjAwMDM7NTAwOzU7MDtmYWxzZQ", // one spiral warps into two
    "eSp0ICsgdF4yIC0geSAtIHleMiArIHgqdCAtIHReMjt4XjIgLSB4ICsgeSAtIHQ7MzAwOzMwMDswOzA7MTstMC4xOzAuMjM7MC4wMDAyOzYwMDs5OzY7ZmFsc2U", // ring of fire
    "LXReMiAtIHleMiAtIHgqeSAtIHgqdCAtIHkqdCAtIHggLSB0O3ReMiAtIHgqdCAteTs0MDA7NDAwOzA7MDsxOy0wLjM7MC4zOzAuMDAwNTs4MDA7MTA7MDtmYWxzZQ", // giga-spiral into mess
    "eF4yICsgeV4yIC0geCp5ICsgeSp0IC0geCAtIHQ7LXReMiAtIHleMiAtIHgqeSAtIHgqdCArIHkgKyB0OzYwMDs2MDA7NTA7NTA7MzstMC4wMjswLjg7MC4wMDA1OzUwMDsxMDsyO2ZhbHNl", // magic purple triangle
    "eCp5KnQgLSB4XjIgLSB5IC0gdF4yO3gqeSp0ICsgeCArIHleMiArIHQ7NjAwOzYwMDstMTAwOy03MDsxOy0wLjg7MC4zNTswLjAwMDQ7NTAwOzEwOzA7dHJ1ZQ", // super spiral trail
    "dF4yICsgeCp5ICsgeF4yIC0gMnleMiAtIHgqdCArIHk7eF4yICsgeSAtIHReMiArIHgqeTs1MDA7NTAwOzA7MDsxOy0wLjU1OzAuNzswLjAwMDY7NjAwOzE1OzA7ZmFsc2U", // double warp (cool spiral angle)
    "MngqeSAtIHgqdCArIHggLSB0IC0gdF4yICsgeF4yIC0geCp0Oy0geF4yIC0gdF4yIC0geCp5ICsgeSAtIHkqdCArIDJ0OzQwMDs0MDA7LTM1MDsxNTA7MTswLjY7MS4wMjswLjAwMDE7NzAwOzc7MDtmYWxzZQ", // 3d shape dissolve 
    "eF4yIC0geCArIHkgLSB0IC0geCp0ICsgeV4yOy14KnkgLSB4XjIgKyAyeCp0ICsgdCArIHggLSB0XjI7NTAwOzUwMDsyNTA7MDsyOy0wLjE7MC4zOzAuMDAwMjs1MDA7NTsxMDtmYWxzZQ", // double white portal
    "eCp0ICsgeV4yIC0geSp0ICsgeF4yO3kqdCAtIHReMjs2MDA7NjAwOzA7LTMwMDsxOy0xLjAyOy0wLjc2OzAuMDAwMTs1MDA7NTs5O3RydWU", // green scanlines (very unique)
    "eV4yIC0geCp5ICsgeSp0IC0gdDt5XjIgLSB4ICsgdF4yOzQ1MDs0NTA7MTUwOy0yNTsyOy0wLjIzOy0wLjEzOzAuMDAwMDM7NDAwOzEwOzA7ZmFsc2U", // colorful double spiral
    "eV4yIC0geCp5ICsgeSp0IC0gdDt5XjIgLSB4ICsgdF4yOzE1MDA7MTUwMDswOzgwMDsxOzAuNDswLjYxOzAuMDAwMTs1MDA7MTU7MTE7dHJ1ZQ", // the black hole
    "LXkgKyB0XjIgKyB4XjI7MnheMiArIHkqdDs0MDA7NDAwOzEwMDs1MDsxOy0wLjY4Oy0wLjY2NTswLjAwMDAwNjs1MDA7MTU7MDtmYWxzZQ", // square vortex with offshoots
    "eSp0ICsgdF4yIC0gdCArIHggKyB5ICsgeF4yO3heMiArIDJ4KnkgLSB0IC0geDs0MDA7NDAwOzA7MDsxOy0wLjE7MC4wODswLjAwMDA1OzEwMDA7ODswO2ZhbHNl", // the classic spiral
    "LXheMiAtIHgqdCArIHkqdCAtIHg7LXleMiAtIHReMiAtIHgqeSAtIHgqdCAtIHkqdCAtIHk7NDAwOzQwMDstNTA7LTEwMDsxOy0wLjA1OzAuNTM7MC4wMDAyOzgwMDs4OzA7ZmFsc2U", // circle into mess 
    "LXgqeSp0IC0geF4yIC0geSAtIHReMjsteCp5KnQgKyB4ICsgeV4yICsgdDs0MDA7NDAwOy0xMDA7LTEwMDsxOy0xLjE1OzAuNDQ7MC4wMDA0OzYwMDs1OzA7ZmFsc2U", // triangle into spirals
    "eCp0IC0geSAtIHleMjt4IC0gMnkqdDs2NTA7NjUwOzA7MDs1Oy0wLjU7MC45OzAuMDAwNTsyMDsxMDA7ODt0cnVl", // the pink rose
    "eCp0IC0geV4yIC0geCAtIHkqdCArIHheMiAtIHkqdCArIHQ7eSAtIHkgKyB4KnQgLSB5ICsgdCAtIHgqeSArIHgqdDs0MDA7NDAwOzA7MDsxOy0wLjM7MDswLjAwMDA3OzUwMDs1OzEwO2ZhbHNl", // simple white spiral
    "eV4yICsgeV4yICsgeSAtIHReMjt4KnkgKyB5KnQgLSB4KnkgKyB4KnQ7NDAwOzQwMDswOzA7MTstMC43Oy0wLjU7MC4wMDAwNTs3NTA7Njs1O2ZhbHNl", // blue whirlpool
    "LXkgKyB0XjIgKyB4XjI7MnheMiArIHkqdCArIHg7ODAwOzgwMDswOzc1OzE7LTAuMDE7MC40NTswLjAwMDE1OzYwMDs3Ozc7ZmFsc2U", // yellow circle into flower
    "LXkgKyB0XjIgKyB4XjIgKyB4OzJ4XjIgKyB5KnQgKyB4OzQwMDs0MDA7MDswOzE7MDswLjM1OzAuMDAwMTs1MDA7NTswO2ZhbHNl", // spiral into shape
    "eF4yICsgeV4yIC0gdF4yO3heMiAtIHleMiArIHReMjs1MDA7NTAwOy03NTsyNTA7MTswLjU7MS4wNzswLjAwMDI7NTAwOzU7MDtmYWxzZQ", // triangle pop!
]

window.presets = presets;
