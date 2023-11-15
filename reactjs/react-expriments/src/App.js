import { useEffect } from "react";
import Root from "./components/ComponentTree/Root";
import UseCallbackDemo from "./components/UseCallbackDemo";
import RootComponent from "./components/UseContextUsage/RootComponent";
import UseMemo from "./components/UseMemo";
import UseReducerDemo from "./components/UseReducerDemo";
import UseRefDemo from "./components/UseRefDemo";
function App() {

  useEffect(() => {
    console.log('bbb')
  }, [])

  return (
    <div>
      {/* <UseCallbackDemo/> */}
      {/* <UseMemo/> */}
      {/* <UseRefDemo/> */}
      {/* <RootComponent/> */}
      {/* <UseReducerDemo/> */}
      <Root/>
    </div>
  );
}

export default App;
