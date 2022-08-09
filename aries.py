import requests
import json

url = "https://api.mt.vsk.gr/present-proof-2.0/records"

payload={}
headers = {
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3YWxsZXRfaWQiOiIwNWY4N2YwOC0zZjAwLTQxNmItYWQwYy0yYWYyNGM1NjkyZDkiLCJpYXQiOjE2NTk5NTA3ODZ9.ZCQFxKcatt5OPipNa94SIgaAfO9RVH0tEt9MjWhd5uQ'
}

response = requests.request("GET", url, headers=headers, data=payload)

data = response.json()
for r in data["results"]:
    # print(r["pres_ex_id"])
    response = requests.request("DELETE", url + "/"+r["pres_ex_id"], headers=headers, data={})
    print(response.text)