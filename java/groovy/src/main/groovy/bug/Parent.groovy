package bug

class Parent {
    private String parentMethodB() {
        'parentMethodB'
    }
    protected String parentMethodC() {
        def closure = { parentMethodB()}
        closure()
    }
}
