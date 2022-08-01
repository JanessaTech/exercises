package enums

enum RoleGroupTimeSearchType {
    CREATED_AT(0),
    UPDATED_AT(1)

    private int value
    private RoleGroupTimeSearchType(int value) {
        this.value = value
    }

    static RoleGroupTimeSearchType valueOf(int val) {
        switch (val) {
            case 0 : return CREATED_AT
            case 1: return UPDATED_AT
            default:
                throw new IllegalArgumentException('not valid enum id for RoleGroupTimeSearchType class: ' + val)
        }
    }
}