import json
import bcrypt
import re
import pymongo
from pymongo import MongoClient
from randomuser import RandomUser
from helper import randomstring
import random


def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://adminuser:Techbinge%40999@techbingedb.rdpo4.mongodb.net/mosooklimo?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we Test Chauffeurwill use the same database throughout the tutorial
    return client['mosooklimo']

# This is added so that many files can reuse the function get_database()


if __name__ == "__main__":
    # Get the database
    dbname = get_database()
    chauffersCollection = dbname['chauffeurs']
    chauffersCollection.delete_many({ "name": {"$regex": "Test Chauffeur"} })

    chauffer_subcars = json.load(open('data-cars.json'))
    chaufferlist = []
    for i, user in enumerate(RandomUser().generate_users(len(chauffer_subcars))):
        template = {
            "name": f"Test Chauffeur {i}",
            "email": f"chauffeur{i}@email.com",
            "phone": "+91-{}".format("".join(re.findall(r"\d", user.get_cell()))),
            "password": bcrypt.hashpw('1234'.encode(), bcrypt.gensalt(rounds=10)).decode(),
            "agencyName": random.choice(["Agency A", "Agency B", "Agency C"]),
            "registrationNo": f"{randomstring(2).upper()}-{randomstring(8).upper()}",
            "seatingCapacity": random.randrange(2, 4),
            "luggageCapacity": random.randrange(1, 3),
            "country": random.choice(["IN", "AE", "UK"]),
            "state": "Riyadh Region",
            "fuelType": "petrol",
            "isVerified": True,
            "status": random.choice(["active", "inactive"]),
            "activeCity": random.choice(["Riyadh", "Jeddah", "Mecca", "Medina"]),
            "activeCountry": random.choice(["SAU"]),
            "paymentDetail": "Please Add Payment Details",
            "userDocument":"https://www.canva.com/design/DAFHWiZMgo4/wUHxE0Qfvzx659XqRdn6cQ/view?website#4:swamix.com",
            **chauffer_subcars[i]

        }
        chaufferlist.append(template)
        print(template)

    chauffersCollection.insert_many(chaufferlist)

    # item_1 = {
    # "_id" : "U1IT00001",
    # "item_name" : "Blender",
    # "max_discount" : "10%",
    # "batch_number" : "RR450020FRG",
    # "price" : 340,
    # "category" : "kitchen appliance"
    # }

    # item_2 = {
    # "_id" : "U1IT00002",
    # "item_name" : "Egg",
    # "category" : "food",
    # "quantity" : 12,
    # "price" : 36,
    # "item_description" : "brown country eggs"
    # }

    # print(dbname)
    # print(chauffersCollection)
