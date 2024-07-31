declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Align = (typeof ALIGN_OPTIONS)[number];

function test1() {
    var align: Align = 'start'
    console.log(typeof align)
}

test1()