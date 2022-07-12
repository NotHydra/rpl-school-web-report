import json

class Utility():
    def writeJSON(path, data):
        with open(path, "w") as outfile:
            outfile.write(json.dumps(data, indent=4))

    
    