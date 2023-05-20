export type ICacheService = {
  set(key: string, value: string | number, expirationInMinutes?: number): Promise<void>;
  get(key: string): Promise<string | null>;
  // remove(key: string): void;
  // clearAll(): void;
  // hasKey(key: string): boolean;
  // getSize(): number;
};
