// 深度可选类型
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  // 类型安全的路径访问
  type PathImpl<T, K extends keyof T> = 
    K extends string
    ? T[K] extends Record<string, any>
      ? `${K}.${PathImpl<T[K], keyof T[K]>}`
      : K
    : never;
  
  type Path<T> = PathImpl<T, keyof T>;
  
  // 使用示例
  interface User {
    id: number;
    info: {
      name: string;
      address: {
        city: string;
        zip: string;
      };
    };
  }
  
  // 测试深度可选
  const partialUser: DeepPartial<User> = {
    info: { address: { city: "Beijing" } }
  };
  
  // 测试路径类型
  type UserPath = Path<User>; // "id" | "info" | "info.name" | "info.address" | "info.address.city" | "info.address.zip"
  
  // 类型安全的get函数
  function get<T, P extends Path<T>>(obj: T, path: P): any {
    return path.split('.').reduce((o, k) => (o || {})[k], obj);
  }
  
  const user: User = {
    id: 1,
    info: {
      name: "Alice",
      address: { city: "Shanghai", zip: "200000" }
    }
  };
  
  console.log(get(user, "info.address.city")); // 类型安全访问