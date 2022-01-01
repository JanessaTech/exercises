This demos is to show how annotation works </br>

I used an example of serializing an object into a json string to show the mechanism of annotation </br>

Here are what I did:
1. I introduced there custom annotations:
     - JsonSerializable : It applies on Class
     - Init : It applies on method
     - JsonElement : It applies on field
2. Then I used java class reflection to use annotations defined by myself
3. The key is isAnnotationPresent which is used to figure out whether a class/method/field has the target annotation

How to run this demo: </br>
You could run ObjectToJsonConverter or givenObjectSerializedThenTrueReturned