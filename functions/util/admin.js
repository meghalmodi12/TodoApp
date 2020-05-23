const admin = require('firebase-admin')
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "todoapp-a2575",
        "private_key_id": "f62cec5ed96a2e3147f11b783001f7a526e8d738",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/1jJvosscYRnc\n/0V78e5jzclW977gRXbvaBS/+GZz2J5V4lATc2a9hsWg9HwbZyRGeBmzoO8+hEi7\n2rB06XLa1b08jAEuXYTq7rYq7B3pVKZCyYYPoAgTcIxYvYGtDBY5vvzvWZtc+o44\n1C/Hv250MFLjzjEZAREHNXBdUa3L2UpD3+dw0hedUEiVkLAqBx/7D7V+mUsGIeHn\n8Xy0QszwvpwQB3oL+vX0IRU8ov5spWy/d7evHd/9QB5KwPhP5f/ElKUPpgfBofv3\nhDSHiGZqrhsx2ZyDz6ZMukskSHE73aHT85ACmVGAnjaYcFZnfBuYosQIt/ObH1PI\nclWzWS+TAgMBAAECggEAJDvWceyLNZSHmIzkuGj1UIeNeG458M1eDhEYHjxSSZ5I\nJculuU7KQJEEogabrGdaXC8SF7IVjjbZMBY5zxNK/NdzM0z0aigC04b8BHZtneU9\ntA6xUiE1dUqET7yXkjJevlB7INBJfpHarBQz5CQdvjdkaJ/I+UKQz05CJ3YmgAJ6\nQV83cmSfBCG6WjrN5VHpcV41pNTEa4B7ExmVzvS6AeVY0rFooPmKaEPbL5uQBP7I\nk/7bgz/T98wvXXmRElsKZUdHNRryZWXSlwF6BHPqMSguCcOEY74KQu0HHgSuvtYw\nTDDq3wI7HqMhHJQ88CptjCg83EPLOr2co1Ssd6D4/QKBgQDvxo0Meal3U0MZNHBB\nPBaqHJ0Ns5kJhYIhAll2K2fTvf5D96bQLyhvnso/OO0Q3rCvMlodVp8tbbfwJWCP\np4DxVxu+/p2fehBTvOwS+qPBgVgX+QSzHeAHLba+87HH9Qt6nO0Unp3bo2VuO1NX\n9oyl9usPsp5+oyFrbsp86uHIpQKBgQDM0TzK3O8KrXMkkGkdOfzFQfDsVDtTdVWR\nsNVQzJ2yQoNnKRfpUHo6xNiHFgyxSfCyHoPO73BJ5tq5pYHcAf4xsUgfcCbpbOdu\nkuFSGbt3HKNNyeB6xSHYaITAW1HUUD4TBbztvMjR/Y/QR74WnoeLFiVVi3lVkFoo\nZoiSKVZp1wKBgGYlMIti/OW/i7MeGsA/p+waOnHO0+Axhwkm5hOoVBfpNXug8eh4\nXoKGo+QhDSUFqUFJcwhSkYcZ2aUtVyB7nDuz/zbzYxTAPFpf/jXrnn1d67hytiTU\nEk8ck2Bvkon7g0NdvMXu+JLL3fcCwPOVLb+6G9NZJZoPRrpsvUhQC5WdAoGAQKXy\nuF2QHiCtbWcfppf9Dw5HS3Ey4J7yiW/1hPFw/Sk9bLxtzbkXO6GSbuEo1HTwQmib\nViABo3H4rAxvts/yOiEpELNHtPoo+p/l+xIgN/KUISONdXLvwe0LqeOpKojBbyOq\nhKfIA3Azipx6hY04X1B4LE4/2CAeNQ5YITpnCjUCgYBtP/YAo+LuxKRyPa/yfJkR\nHyib6rvzLEV4bePXcY7quW8LGyOddoNFkuPIYcY4ediN/2qFNSy4VnZBx1dBrqOW\nsOFNysIosrKupX1CV3jb9/JENRDNvIQzt0TMr6KhBHVWgowO+ydu1xdXnoEGYmbk\nI3ts9k4/ChW2RvBNtOPySQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-3m178@todoapp-a2575.iam.gserviceaccount.com",
        "client_id": "100948708776611563737",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3m178%40todoapp-a2575.iam.gserviceaccount.com"
      }),
    databaseURL: 'https://todoapp-a2575.firebaseio.com/',
    storageBucket: 'todoapp-a2575.appspot.com',
})

const db = admin.firestore()

module.exports = { admin, db }