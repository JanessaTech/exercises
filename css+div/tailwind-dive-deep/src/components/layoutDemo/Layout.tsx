import Position from "../positionDemo/Position"
import FloatTest from "./FloatTest"
import ObjectFit from "./ObjectFit"


const LayoutDemo:React.FC<{}> = () => {
    return (
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            {/* <FloatTest/> */}
            {/* <ObjectFit/> */}
            <Position/>
        </div>
    )
}

export default LayoutDemo