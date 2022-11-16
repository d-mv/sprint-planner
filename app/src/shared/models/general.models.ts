// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any;

export type Option<T> = T | undefined | null;

export type RecordObject<Values = unknown> = Record<string, Values>;
