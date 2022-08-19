import requests

if __name__ == '__main__':
	url='http://localhost:5000/api/chauffeurs/cars/filter?brand=MERC'
	print(requests.get(url).json())