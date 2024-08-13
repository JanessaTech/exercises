function test1() {
    type M0 = 'description' | 'completed' | 'aa'
    interface Todo {
        title: string
        description: string
        completed: boolean
      }
    type keys = keyof Todo
    type res1 = M0 extends keys ? 1 : 0
}

function test2() {
    const tuple = [1] as const

    type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
    type M0 = Concat<typeof tuple, typeof tuple>
}

function test3() {
    let vAny: any = 'xx'
    let vUnknown: unknown = 'xx'
    let s1: string = vUnknown
    let s2: string = vAny

    type res1 = string extends any ? 1 : 2
    type res2 = string extends unknown ? 1 : 2
    type res3 = unknown extends string ? 1 : 2
    type res4 = any extends string ? 1 : 2
}