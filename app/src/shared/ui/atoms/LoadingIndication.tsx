import { Spinner } from '.';
import { getAllIsLoading, useSelector } from '../../../state';

export function LoadingIndication() {
  const isLoading = useSelector(getAllIsLoading);

  const isAnyLoading = Object.entries(isLoading)
    .filter(el => Boolean(el[1]))
    .some(Boolean);

  if (isAnyLoading) return null;

  return (
    <div className='w-fit m-h-1'>
      <Spinner color='inherit' />
    </div>
  );
}
