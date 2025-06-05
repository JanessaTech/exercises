type SpreadTestProps = {
    name: string,
    addr: string,
    age: number,
    major: string
}
const obj = {
    name: 'Jane',
    addr: 'xian',
    age: 12,
    major: 'CS'
}

const spreadTest = ({name, ...props}:SpreadTestProps) => {
    console.log(name)
    console.log(props)
    if (props['addr']) {
        console.log("props['addr'] = ", props['addr'])
    }
}

spreadTest(obj)

