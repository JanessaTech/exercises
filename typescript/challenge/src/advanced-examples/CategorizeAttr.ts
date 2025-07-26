type RequiredKeys<T> = {
    [K in keyof T]-? : T extends Record<K, T[K]> ? K : never
}[keyof T]

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>
type User = {
    id : string;
    name: string;
    age ?: number;
    phone ?: string
}

type test1 = User extends Record<'phone', string> ? 1 : 0
type test2 = User extends Record<'name', string> ? 1 : 0
type reqKeys = RequiredKeys<User>
type optKeys = OptionalKeys<User>

type BackwardCompatible<T> = T & Partial<Record<OptionalKeys<T>, never>>
type bc = BackwardCompatible<User>
type bc1 = Partial<Record<OptionalKeys<User>, never>>

