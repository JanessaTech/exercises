import { serverSideFunction } from "@/utils/server-uitils"
import { ImageSlider } from "@/components/ImageSlider"

export default function ServerRoutePage(){
    console.log('server route rendered')
    const res = serverSideFunction()
    return (
        <>
        <div>ServerRoutePage</div>
        {/* <p>{res}</p> */}
        <ImageSlider/>
        </>
        
    )
}