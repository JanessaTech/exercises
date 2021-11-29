class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
        def p = new Person()
        if(!p?.name){
            print('name is null')
        }
    }
}
