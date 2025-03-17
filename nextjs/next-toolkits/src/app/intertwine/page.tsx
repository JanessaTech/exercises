import { Suspense } from "react";
import GetData from "./_getData/page";

export default function InterTwineHomePage() {

    return (
        <div>
            <div>InterTwineHomePage</div>
            <Suspense fallback={<p>Loading data</p>}>
                <GetData/>
            </Suspense>
        </div>
       
    )
}