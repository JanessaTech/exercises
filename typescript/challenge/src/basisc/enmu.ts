

function compareEnum() {
    enum Season {
        Spring,
        Summmer,
        South,
        Winter
    }
    
    let enum1 = Season.Summmer
    let enum2 = Season.Winter
    
    let season = Season.Spring
    console.log(enum1 as Season === Season.Winter)
    console.log(enum2 as Season === enum2 as Season)
}

function getEnumName() {
    enum MyEnum {bar, foo}
    for (const mem in MyEnum) {
        console.log(mem)
    }
    console.log(MyEnum[MyEnum.bar])
    


}

//compareEnum()
getEnumName()
