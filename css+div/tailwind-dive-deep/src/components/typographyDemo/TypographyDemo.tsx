import ListTest from "./ListTest"
import TextTest from "./TextTest"


const TypographyDemo:React.FC<{}> = () => {
    return (
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            {/* <ListTest/> */}
            <TextTest/>
        </div>
    )
}
export default TypographyDemo