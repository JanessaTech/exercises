import { useEffect } from "react";
import Root from "./components/ComponentTree/Root";
import InfiniteScrollDemo from "./components/InfiniteScrollDemo";
import StateUpdate from "./components/StateUpdate";
import UseCallbackDemo from "./components/UseCallbackDemo";
import RootComponent from "./components/UseContextUsage/RootComponent";
import UseEffectDemo from "./components/UseEffectDemo";
import UseMemo from "./components/UseMemo";
import UseReducerDemo from "./components/UseReducerDemo";
import UseRefDemo from "./components/UseRefDemo";
function App() {

  return (
    <div>
      {/* <UseCallbackDemo/> */}
      {/* <UseMemo/> */}
      {/* <UseRefDemo/> */}
      {/* <RootComponent/> */}
      {/* <UseReducerDemo/> */}
      {/* <Root/> */}
      {/* <UseEffectDemo/> */}
      {/* <StateUpdate/> */}
      <InfiniteScrollDemo />
    </div>
  );
}

export default App;
