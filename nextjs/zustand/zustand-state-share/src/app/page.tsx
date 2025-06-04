import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="grid grid-cols-5 gap-10">
      <SideBar/>
      <Editor/>
    </div>
  );
}
