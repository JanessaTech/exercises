
function App() {
  return (
    <div className="text-gray-600 font-janessa">
      <div>
        <nav>
          <div>
            <h1 className="font-bold uppercase p-4 border-b border-gray-100">
              <a href="/">Food Ninja</a>
            </h1>
          </div>
          <ul>
            <li className="text-gray-800 font-bold">
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>About</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main className="px-16 py-6">
        <div>
          <a href="#" className="text-primary">Log in</a>
          <a href="#" className="text-primary">Sign up</a>
        </div>
        <header>
          <h2 className="text-gray-900 font-semibold text-6xl">Recipes</h2>
          <h3 className="text-2xl font-semibold">For Ninjas</h3>
        </header>
        <div>
          <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">Latest Recipes</h4>
          <div className="mt-8">
            <div> 
              <img src="img/jichi.png" alt="stew"/>
              <div>
                <span>5 Bean Chili Stew</span>
                <span>Recipe by Mario</span>
              </div>
            </div>
          </div>
          <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">Most Popular</h4>  
          <div className="mt-8">
          </div>
          <div>
            <div className="bg-secondary-100">Load more</div>
          </div>   
        </div>
      </main>
    </div>
  );
}

export default App;
