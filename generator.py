import random

terms = [
    "x^2",
    "y^2",
    "t^2",
    "x*t",
    "y*t",
    "x*y",
    "x",
    "y",
    "t",
]

connectors = [
    " + ",
    " - ",
]

def generate():
    num_terms = random.randint(2, 9)

    list_of_terms = [random.choice(terms) for _ in range(num_terms)]
    list_of_connectors = [random.choice(connectors) for _ in range(num_terms - 1)]

    equation = ""

    for i in range(num_terms - 1):
        equation += list_of_terms[i] + list_of_connectors[i]
    equation += list_of_terms[-1]

    return equation

for i in range(10):
    print(generate())
