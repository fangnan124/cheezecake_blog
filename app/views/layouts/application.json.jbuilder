json.meta do
  json.code 200
end
json.data JSON.parse(yield)
json.errors do
  json.title ''
end