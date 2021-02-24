import sys
import json

result = {
  "arr1": json.loads(sys.argv[1]),
  "arr2": json.loads(sys.argv[2])
}
print(result)