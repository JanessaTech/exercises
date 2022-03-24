How to run this demo:

0. Prepare node.js installation

  - Install node.js </br>
  
    Go to https://nodejs.org/en/ to download node.js installation and install it
    
  - Install GraphQL client
  
    Go to https://altair.sirmuel.design/ to download Altair GraphQLClient and install it
    

1. Run the command below to install the necessary library
```
npm install body-parser
npm install notarealdb
```

You will see a new  directory named node_module created which contains the libraries you downloaded </br>

Run the command below to list the libraries installed : </br>
```
npm ls
```
2. Run server 

  You will see info saying 'Server started on port 9000'

3. Run query commands in Altair GraphQLClient

  In Altair GraphQLClient, input url to be 'http://127.0.0.1:9000/graphql' (GET method) and enter query like below:
  ```$xslt
query {
  sayHello(name:"Jane")
  greeting
  students {
    id
    firstName
    college {
      id
      name
      location
    }
  } 
  studentById(id: "S1001") {
    id
    firstName
  }
}
```

You will see result like below: </br>
```$xslt
{
  "data": {
    "sayHello": "Hi Jane GraphQL server says Hello to you!!",
    "greeting": "hello from  TutorialsPoint !!!",
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1U_IZIvY",
        "firstName": "Tim",
        "college": null
      },
      {
        "id": "HJQZlfLvF",
        "firstName": "Juan",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "SJVftE8vK",
        "firstName": "Susan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "HyFBtVIwY",
        "firstName": "Susan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ],
    "studentById": {
      "id": "S1001",
      "firstName": "Mohtashim"
    }
  }
}
```

4. Run mutation commands in Altair GraphQLClient </br>

 In Altair GraphQLClient, input url to be 'http://127.0.0.1:9000/graphql' (POST method) and enter mutation like below:
 
 ```$xslt
mutation addStudent_returns_object{
  createStudent(collegeId:"col-101", firstName:"jane11", lastName: "zhao11")
  addStudent_returns_object(collegeId:"col-101", firstName:"jane22", lastName: "zhao22") {
    id
    firstName
    lastName
    fullName
    college {
      id
      name
      location
      rating
    }
  }
}
```

You will see result like below: </br>
```$xslt
{
  "data": {
    "createStudent": "H18lLhYMq",
    "addStudent_returns_object": {
      "id": "H1xLxL2FMc",
      "firstName": "jane22",
      "lastName": "zhao22",
      "fullName": "jane22:zhao22",
      "college": {
        "id": "col-101",
        "name": "AMU",
        "location": "Uttar Pradesh",
        "rating": 5
      }
    }
  }
}
```