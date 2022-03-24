package data

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString


@ToString(includeNames = true)
@EqualsAndHashCode
class GameFamilyTranslation implements Serializable {
    private static final long serialVersionUID = 1L

    Long id

    Long familyId


    String lang

    String translation
}