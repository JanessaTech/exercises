import Editor from "@/components/Editor";
import Sidebar from "@/components/SideBar";


export default function Home() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Sidebar/>
      <Editor/>
    </div>
  );
}
