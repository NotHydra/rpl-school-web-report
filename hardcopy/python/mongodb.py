import json

from pymongo import MongoClient
from dotenv import dotenv_values

class Database():
    def get_cluster(mongoDBURI):
        return MongoClient(mongoDBURI)

    
    def get_database(mongoDBURI, database_name):
        return Database.get_cluster(mongoDBURI)[database_name]

    
    def get_collection(mongoDBURI, database_name, collection_name):
        return Database.get_database(mongoDBURI, database_name)[collection_name]


class Upload():
    def upload(mongoDBURI, database_name, collection_name, data_path):
        collection = Database.get_collection(mongoDBURI, database_name, collection_name)

        data_array = json.load(open(data_path))

        for data in data_array:
            collection.replace_one({"id": data.get("id")}, data, upsert=True)


class Main():
    env_value = dotenv_values("./.env")

    def main():
        mongoDBURI = Main.env_value.get("MongoDBURI")
        database_name = "Development"

        Upload.upload(mongoDBURI, database_name, "students", "./hardcopy/json/student.json")
        Upload.upload(mongoDBURI, database_name, "assignments", "./hardcopy/json/assignment.json")


Main.main()