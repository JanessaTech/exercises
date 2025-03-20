import UseCallbackDemo from "@/components/basics/UseCallBackDemo";
import UseContextDemo from "@/components/basics/UseContextDemo";
import UseCustomHookDemo from "@/components/basics/UseCustomHookDemo";
import UseEffectDemo from "@/components/basics/UseEffectDemo";
import UseMemoDemo from "@/components/basics/UseMemoDemo";
import UseRefDemoOne from "@/components/basics/useRef/UseRefDemoOne";
import UseRefDemoTwo from "@/components/basics/useRef/UseRefDemoTwo";
;

export default function BasicPage() {
    return (
        <div>
            <div>BasicPage</div>
            {/* <UseEffectDemo/> */}
            {/* <UseContextDemo/> */}
            {/* <UseRefDemoOne/> */}
            {/* <UseRefDemoTwo/> */}
            {/* <UseCallbackDemo/> */}
            {/* <UseMemoDemo/> */}
            <UseCustomHookDemo/>
        </div>
        
    )
}