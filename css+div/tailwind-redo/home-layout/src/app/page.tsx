

export default function Home() {
  return (
   <div className="w-full flex">
    <div className="w-[200px] h-screen bg-green-200 sticky top-0"></div>
    <div className="grow bg-zinc-300">
      <div className="h-20 text-white sticky top-0 bg-black">header</div>
      <div className="h-20 bg-yellow-400"></div>
      <div className="sticky top-20 bg-green-900">table header</div>
      <div className="bg-pink-300 h-72">item1</div>
      <div className="bg-pink-300 h-72">item2</div>
      <div className="bg-pink-300 h-72">item3</div>
      <div className="bg-pink-300 h-72">item4</div>
    </div>
   </div>
  );
}
