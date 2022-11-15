import { LazyExoticComponent, ComponentType, Suspense, PropsWithChildren } from 'react';
import { AnyValue } from '../../models';

interface LazyLoadOptions {
  isDefault: boolean;
  isLoading: JSX.Element;
  message?: string;
}

type Component = LazyExoticComponent<ComponentType<AnyValue>>;

export function lazyLoad(Component: Component, options?: Partial<LazyLoadOptions>) {
  let fallback = null;

  if (options?.isDefault) fallback = 'Loading...';

  if (options?.isLoading) fallback = options?.isLoading;

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}

export function LazyLoad({ isDefault, isLoading, children, message }: PropsWithChildren<Partial<LazyLoadOptions>>) {
  let fallback = null;

  if (isDefault) fallback = 'Loading...';

  if (isLoading) fallback = isLoading;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
