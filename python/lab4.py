from flask import Flask, jsonify
from datetime import datetime
import random

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello, World!"})

def generate_sock(sock_id):
    sizes = ["Small", "Medium", "Large"]
    colors = ["Red", "Blue", "Green", "Yellow"]
    patterns = ["Plain", "Striped", "Polka Dot", "Argyle"]
    materials = ["Cotton", "Wool", "Bamboo", "Synthetic"]
    conditions = ["New", "Used", "Worn"]
    foot_types = ["Left", "Right", "Both"]

    sock = {
        "id": sock_id,
        "sockDetails": {
            "size": random.choice(sizes),
            "color": random.choice(colors),
            "pattern": random.choice(patterns),
            "material": random.choice(materials),
            "condition": random.choice(conditions),
            "forFoot": random.choice(foot_types)
        },
        "additionalFeatures": {
            "waterResistant": random.choice([True, False]),
            "padded": random.choice([True, False]),
            "antiBacterial": random.choice([True, False])
        },
        "addedTimestamp": datetime.now().isoformat()
    }
    return sock

@app.route('/socks/<int:num_socks>')
def get_socks(num_socks):
    socks_list = [generate_sock(i + 1) for i in range(num_socks)]
    return jsonify(socks_list)

if __name__ == '__main__':
    app.run(debug=True)
