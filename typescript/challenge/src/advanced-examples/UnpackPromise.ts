type UnpackPromise<T> = T extends Promise<infer U> ? UnpackPromise<U> : T;

// 测试
type NestedPromise = Promise<Promise<string>>;
type ResolvedType = UnpackPromise<NestedPromise>; // string