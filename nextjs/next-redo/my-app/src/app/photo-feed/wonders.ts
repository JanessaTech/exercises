import { StaticImageData } from "next/image";
import photo1 from './photos/1.png'
import photo2 from './photos/2.png'
import photo3 from './photos/3.png'
import photo4 from './photos/4.png'
import photo5 from './photos/5.png'
import photo6 from './photos/6.png'

export type WonderImage = {
    id: string;
    name: string;
    src: StaticImageData;
    photographer: string;
    location: string
}
const wonderImages: WonderImage[] = [
    {id: '1', name: 'white cute cat', src: photo1, photographer: 'JanessaTech', location: 'China'},
    {id: '2', name: 'clothes in fashion', src: photo2, photographer: 'JanessaTech', location: 'USA'},
    {id: '3', name: 'My mouse', src: photo3, photographer: 'JanessaTech', location: 'Indian'},
    {id: '4', name: 'Huawei Galaxy 127x', src: photo4, photographer: 'JanessaTech', location: 'China'},
    {id: '5', name: 'Mac book 01x', src: photo5, photographer: 'JanessaTech', location: 'USA'},
    {id: '6', name: 'Gits tools', src: photo6, photographer: 'JanessaTech', location: 'Germany'},
]

export default wonderImages