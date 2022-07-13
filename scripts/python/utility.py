import json


class Utility:
    switchStatus = {None: 0, "ü": 1, "NON-MUS": 3}

    def writeJSON(path, data):
        with open(path, "w") as outfile:
            outfile.write(json.dumps(data, indent=4))

    def convertStatus(status):
        return Utility.switchStatus.get(status)
