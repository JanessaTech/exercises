

export default function Home() {
  return (
    <div className="flex w-full bg-green-200">
      <div className="w-[200px] h-screen sticky top-0 bg-pink-100"> mean</div>
      <main className="grow bg-zinc-300">
        <div className="h-10 bg-black sticky top-0 text-white">header</div>
        <div className="h-40 bg-yellow-500"></div>
        <div className="w-full sticky top-10 bg-zinc-400 h-10"> table header</div>
        <div className="bg-green-300 h-40">item1</div>
        <div className="bg-green-300 h-40">item2</div>
        <div className="bg-green-300 h-40">item3</div>
        <div className="bg-green-300 h-40">item4</div>
        <div className="bg-green-300 h-40">item5</div>
        <div className="bg-green-300 h-40">item6</div>
        <div className="bg-green-300 h-40">item7</div>
        <div className="bg-green-300 h-40">item8</div>
      </main>
    </div>
  );
}
