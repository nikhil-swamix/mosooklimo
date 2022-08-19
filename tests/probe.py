import requests

url = "http://65.0.106.156:5000"


resp = requests.get(url)

print(resp.status_code)