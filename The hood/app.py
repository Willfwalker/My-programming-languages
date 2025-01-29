from flask import Flask, render_template, request, jsonify
from hood import translate_to_python, run_hood_code
import sys
from io import StringIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_code', methods=['POST'])
def execute_code():
    hood_code = request.json.get('code', '')
    
    # Capture stdout to get print statements
    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    try:
        run_hood_code(hood_code)
        sys.stdout = old_stdout
        output = redirected_output.getvalue()
        return jsonify({
            'status': 'success',
            'output': output
        })
    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({
            'status': 'error',
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True) 