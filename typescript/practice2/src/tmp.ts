function test1() {
    type DBFields = {
        id: { format: "incrementing" };
        name: { type: string; pii: true };
    };

    type Filter<T> = {
        [K in keyof T]: T[K] extends {pii: boolean} ? true : false
    }
    type M0 = Filter<DBFields>
}
