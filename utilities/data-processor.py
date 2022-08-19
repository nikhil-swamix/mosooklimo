import os
import json

try:
	import unidecode
except:
	os.system('pip install unidecode')
	import unidecode


if __name__ == '__main__':
	filebuffer=open('city-data-original.csv',encoding='utf-8',errors='ignore').read()
	filebuffer=unidecode.unidecode(filebuffer)
	assorted_country_city={ "schema" : "{'country':['city1','city2']}" }

	for l in filebuffer.split('\n'):
		try:
			city,country=l.split(',')
			if not assorted_country_city.get(country):
				assorted_country_city[country]=set()

			assorted_country_city[country].add(city)
		except Exception as e:
			pass

	for k in assorted_country_city:
		try:
			# print(k)
			if k =='schema':
				continue
			assorted_country_city[k]=list(assorted_country_city[k])
			assorted_country_city[k].sort()
		except Exception as e:
			pass

	# print(assorted_country_city)
	print(json.dumps(assorted_country_city,indent='\t'))
