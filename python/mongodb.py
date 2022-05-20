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


class Main():
    env_value = dotenv_values("./.env")

    def main():
        mongoDBURI = Main.env_value.get("MongoDBURI")
        database_name = "Development"
        
        student_collection = Database.get_collection(mongoDBURI, database_name, "students")

        student_data = json.load(open("./json/student.json"))

        for student in student_data:
            student_collection.replace_one({"id": student.get("id")}, student, upsert=True)

    
Main.main()