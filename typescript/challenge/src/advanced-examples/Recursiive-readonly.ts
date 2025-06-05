type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object 
      ? DeepReadonly<T[P]> 
      : T[P];
  };
  
  interface User {
    name: string;
    profile: {
      age: number;
      address: string;
    };
  }
  
  const user: DeepReadonly<User> = {
    name: "Alice",
    profile: { age: 30, address: "123 St" }
  };
  
  // user.profile.age = 31; // 错误！