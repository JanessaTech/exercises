

export default function Home() {
  return (
   <div className="flex w-full">
    <div className="w-[200px] h-screen sticky top-0 bg-yellow-400"></div>
    <main className="grow">
      <div className="h-20 bg-black text-white sticky top-0">header</div>
      <div className="h-28 bg-purple-400"></div>
      <div className="sticky top-20 h-12 bg-red-400">table header</div>
      <div className="bg-green-300 h-40">item1</div>
      <div className="bg-green-300 h-40">item2</div>
      <div className="bg-green-300 h-40">item3</div>
      <div className="bg-green-300 h-40">item4</div>
      <div className="bg-green-300 h-40">item5</div>
      <div className="bg-green-300 h-40">item6</div>
    </main>

   </div>
  );
}
