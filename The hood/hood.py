import re

# Dictionary mapping hood slang to Python keywords
HOOD_TO_PYTHON = {
    "yo": "print",
    "finna": "def",
    "squad": "class",
    "facts": "True",
    "cap": "False",
    "pull_up": "return",
    "yeet": "raise",
    "no_cap": "assert",
    "check_it": "if",
    "else_tho": "else",
    "keep_it_100": "while",
    "deadass": "import",
    "straight_up": "for",
    "in_the_cut": "in",
    "bussin": "lambda",
    "fr_fr": ":",
}

def translate_to_python(hood_code):
    """Translate Hood Python to regular Python"""
    python_code = hood_code
    
    # Replace each hood keyword with Python keyword
    for hood_word, python_word in HOOD_TO_PYTHON.items():
        python_code = re.sub(r'\b' + hood_word + r'\b', python_word, python_code)
    
    return python_code

def run_hood_code(code):
    """Execute Hood Python code"""
    python_code = translate_to_python(code)
    exec(python_code)

# Example usage
if __name__ == "__main__":
    # Example Hood Python code
    hood_code = """
    finna say_wassup(name) fr_fr
        yo(f"Ay yo wassup {name}!")
    
    # Define a simple squad (class)
    squad Homie fr_fr
        finna __init__(self, name) fr_fr
            self.name = name
        
        finna greet(self) fr_fr
            yo(f"Ay {self.name} in the building!")
    
    # Test the code
    say_wassup("G")
    
    # Create a Homie instance
    my_homie = Homie("Big Mike")
    my_homie.greet()
    """
    
    run_hood_code(hood_code)
