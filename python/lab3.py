from datetime import datetime

def generate_socks(*args, **kwargs):
    default_template = {
        "sockDetails": {
            "size": "Large",
            "color": "Yellow",
            "pattern": "Plain",
            "material": "Bamboo",
            "condition": "Used",
            "forFoot": "Both"
        },
        "additionalFeatures": {
            "waterResistant": False,
            "padded": False,
            "antiBacterial": True
        }
    }

    for key in kwargs:
        if key in default_template:
            default_template[key].update(kwargs[key])

    socks = []
    for _ in range(args[0]):
        sock = default_template.copy()
        sock['addedTimestamp'] = datetime.now().isoformat()
        socks.append(sock)

    return socks

custom_socks = generate_socks(3, sockDetails={'color': 'Red'}, additionalFeatures={'waterResistant': True})
print(custom_socks)
