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
    # Create the database for our example (we will use the same database throughout the tutorial
    return client['mosooklimo']
    
# This is added so that many files can reuse the function get_database()

if __name__ == "__main__":    
    # Get the database
    dbname = get_database()
    target_collection=dbname['airports']
    target_collection.delete_many({})
    entries=json.load(open('data-airports.json'))
    xlist=[]

    for e in entries:
        for ekey in e:
            try:
                e[ekey] = e[ekey].encode('utf-8').decode('ascii',errors='ignore')
            except:
                pass

        if e['type'] in ['medium_airport','large_airport','helipad','heliport']:
            pass
        else:
            continue
            
        if e['iata_code']:
            xlist.append({
                'name':f"{e['name']} {e['iata_code']} {e['municipality']}",
                'description':f"this airport is {e['type']} located in  {e['iso_country']} ",
                'country': e['iso_country'],
                })
            

    print(f'Adding {len(xlist)} airports bro.')
    print(target_collection.insert_many(xlist).acknowledged)


