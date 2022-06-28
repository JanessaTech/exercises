How to run :
1. run GraphqlDemo2Application in IDE
2. Open Altair, launch http://localhost:8080/graphqldemo with POST method, execute the following commands:
```aidl
query allbooks {
  allBooks {
    id
    title
    rating {star}
    author {
      id
      firstName
      lastName
    } 
  }
}

query findOne {
  findOne(id: 1) {
    id
    title
    pages
    rating {
      star
    }
    author {
      id
      firstName
      lastName
    }
  } 
}
```

- You will get results:
For the first command: </br>
```aidl
{
  "data": {
    "allBooks": [
      {
        "id": "1",
        "title": "Reactive Spring",
        "rating": {
          "star": "5"
        },
        "author": {
          "id": "1",
          "firstName": "Josh",
          "lastName": "Long"
        }
      },
      {
        "id": "2",
        "title": "Spring Boot Up & Running",
        "rating": {
          "star": "5"
        },
        "author": {
          "id": "2",
          "firstName": "Mark",
          "lastName": "Heckler"
        }
      },
      {
        "id": "3",
        "title": "Hacking with Spring Boot 2.3",
        "rating": {
          "star": "5"
        },
        "author": {
          "id": "3",
          "firstName": "Greg",
          "lastName": "Turnquist"
        }
      }
    ]
  }
}
```
For the second command: </br>
```aidl
{
  "data": {
    "findOne": {
      "id": "1",
      "title": "Reactive Spring",
      "pages": 484,
      "rating": {
        "star": "5"
      },
      "author": {
        "id": "1",
        "firstName": "Josh",
        "lastName": "Long"
      }
    }
  }
}
```