import Image from 'next/image'
import Link from 'next/link'
import stew from '../public/img/stew.jpg'

export default function Home() {
  return (
    <div className="text-gray-600"> 
        <div>
            <nav>
                <div>
                    <h1 className="font-bold uppercase p-4 border-b border-gray-100">
                        <Link href="/">Janessa Food</Link>
                    </h1>
                </div>
                <ul>
                    <li className="text-gray-700 font-bold">
                        <Link href="#">
                          <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <span>About</span>
                        </a>
                    </li>
                    <li>
                        <Link href="#">
                          <span>Contact</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <main className="px-16 py-6">
            <div>
                <Link href="#" className="text-primary">Log in</Link>
                <Link href="#" className="text-primary">Sign up</Link>
            </div>
            <header>
                <h2 className="text-gray-700 text-6xl font-semibold">Recipes</h2>
                <h3 className="text-2xl font-semibold">For Janessa</h3>
            </header>
            <div>
                <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">Latest Recipes</h4>
                <div className="mt-8">
                  <div>
                      <Image src={stew} alt="stew"></Image>
                      <div>
                          <span>5 Bean Chilli Stew</span>
                          <span>Recipe by Mario</span>
                      </div>
                  </div>
                </div>
                <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">Most popular</h4>
                <div className="mt-8">
                </div>
                <div>
                    <div className='bg-secondary-100 text-secondary-200'>Load more</div>
                </div>
            </div>
        </main>
    </div>
  )
}
