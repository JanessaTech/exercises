import { StaticImageData } from "next/image";
import curry from '../../../public/imgs/curry.jpg'
import noodles from '../../../public/imgs/noodles.jpg'
import stew from '../../../public/imgs/stew.jpg'

export type WonderImage = {
    id: string;
    name: string;
    src: StaticImageData
}

const wonderImages: WonderImage[] = [
    {id: '1', name: 'curry', src: curry},
    {id: '2', name: 'noodles', src: noodles},
    {id: '3', name: 'stew', src: stew},
    {id: '4', name: 'curry', src: curry},
    {id: '5', name: 'noodles', src: noodles},
    {id: '6', name: 'stew', src: stew}
]

export default wonderImages