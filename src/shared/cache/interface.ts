export type ICacheService = {
  set(key: string, value: string | number, expirationInMinutes?: number): Promise<void>;
  // get<T>(key: string): T | null;
  // remove(key: string): void;
  // clearAll(): void;
  // hasKey(key: string): boolean;
  // getSize(): number;
};
