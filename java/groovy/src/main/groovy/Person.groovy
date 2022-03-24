import data.GameFamilyTranslation
import lombok.Data
import lombok.ToString

@Data
@ToString
class Person {
    String name
    Integer age
    Map<String, GameFamilyTranslation> translation = [:]
}
