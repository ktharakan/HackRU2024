# app.py
from flask import Flask, request, jsonify
from rag import handle_rag
app = Flask(__name__)

@app.route('/api/rag', methods=['POST'])
def get_rag_response():
    data = request.get_json()
    question = data.get('question')
    print(question)
    response = handle_rag(question=question)
    print(response)
    return jsonify({"response": response})

# Entry point for Google Cloud Functions
if __name__ == "__main__":
    app.run(debug=True)
