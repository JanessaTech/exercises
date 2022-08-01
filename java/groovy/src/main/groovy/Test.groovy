import enums.RoleGroupTimeSearchType

class Test {
    static void main(def args){
        for( RoleGroupTimeSearchType type : RoleGroupTimeSearchType.values()) {
            println(type)
        }

    }
}
