

export default function Home() {
  return (
    <div className="flex w-full">
      <div className="w-[200px] h-screen bg-pink-400 sticky top-0">menu</div>
      <main className="grow">
        <div className="h-20 sticky top-0 bg-black">header</div>
        <div className="h-48 bg-purple-400"></div>
        <div className="bg-zinc-500 h-20 sticky top-20"> table header</div>
        <div className="bg-green-400 h-52">item1</div>
        <div className="bg-green-400 h-52">item2</div>
        <div className="bg-green-400 h-52">item3</div>
        <div className="bg-green-400 h-52">item4</div>
      </main>
    </div>
  );
}
