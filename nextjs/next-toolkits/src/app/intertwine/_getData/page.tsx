

const GetData = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const data = {
        name: 'Janessa',
        age: 21
    }
    return (
        <div>
            <span>Name: {data.age}</span>
            <span>Age: {data.age}</span>
        </div>
    )
}

export default GetData