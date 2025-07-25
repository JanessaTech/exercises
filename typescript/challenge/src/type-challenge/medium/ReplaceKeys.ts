import { Equal, Expect } from "../test-utils"

type NodeA = {
    type: 'A'
    name: string
    flag: number
  }
  
  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }
  
  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }
  
  type ReplacedNodeA = {
    type: 'A'
    name: number
    flag: string
  }
  
  type ReplacedNodeB = {
    type: 'B'
    id: number
    flag: string
  }
  
  type ReplacedNodeC = {
    type: 'C'
    name: number
    flag: string
  }
  
  type NoNameNodeA = {
    type: 'A'
    flag: number
    name: never
  }
  
  type NoNameNodeC = {
    type: 'C'
    flag: number
    name: never
  }
  
  type Nodes = NodeA | NodeB | NodeC
  type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
  type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB
  
  type cases = [
    Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number, flag: string }>, ReplacedNodes>>,
    Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
  ]

  type ReplaceKeys<U, T, Y> = U extends any
  ? {
    [P in keyof U]: P extends T
      ? P extends keyof Y
        ? Y[P]
        : never
      : U[P]
  }
  : never

  //type ReplaceKeys<U, T, Y> = any