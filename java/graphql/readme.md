This is a demo on how springboot with graphql works

How to run:

1. run GraphqlApplication in Intellij IDE

2. launch http://localhost:8080/graphql-Jane-demo in firefox

   do the operations below one by one:

    2.1 show all pets

   ```
   query listPets{
             listPets{
                id
                name
                age
             }
         }
   ```

   2.2 add one pet

   ```
   mutation Addpet{
             addPet(name: "pet1", age: 1){
                respCode
                msg
             }
         }
   ```

   2.3 check the newly created pet

   ```
   query listPets{
             listPets{
               id
               name
               age
            }
         }
   ```

   2.4 update the newly created pet

   ```
   mutation UpdatePet{
            updatePet(id: "xxx", name: "pet1-new", age: 3){
              id
              name
              age
            }
         }
   ```

   note: here "xxx" is the id of the newly created pet created in 2.2

   2.5 delete the pet

   ```
   mutation DeletePet{
             deletePet(id: "xxx"){
                respCode
                msg
             }
         }
   ```

   2.6 add a new pet using input

   ```
   mutation AddPetByInput{
             addPetByInput(input:{
                name: "pet2"
                age: 2
             }){
               id
               name
               age
             }
          }
   ```

Note: If you are using Altair GraphQLClient as GraphQl client, make sure that the url is http://localhost:8080/graphql-api
and for query, use GET method, for mutation, use POST method


Reference: https://www.danvega.dev/blog/2022/05/17/spring-for-graphql/