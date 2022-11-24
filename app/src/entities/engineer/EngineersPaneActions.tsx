import { R } from '@mv-d/toolbelt';
import { IconButton } from '../../shared';
import {
  getAllEngineersFolded,
  getAllEngineersUnfolded,
  unfoldAllEngineers,
  unfoldEngineer,
  useDispatch,
  useSelector,
} from '../../state';

export function EngineersPaneActions() {
  const areAllUnfolded = useSelector(getAllEngineersUnfolded);

  const areAllFolded = useSelector(getAllEngineersFolded);

  const dispatch = useDispatch();

  function handleHide() {
    R.compose(dispatch, unfoldEngineer)();
  }

  function handleShow() {
    R.compose(dispatch, unfoldAllEngineers)();
  }

  return (
    <div className='line w-100 j-end padding-1 list-of-spans'>
      <IconButton
        variant='show'
        iconProps={{ fontSize: 'large' }}
        tooltip='Show all works'
        disabled={areAllUnfolded}
        onClick={handleShow}
      />
      <IconButton
        variant='hide'
        iconProps={{ fontSize: 'large' }}
        tooltip='Hide all works'
        disabled={areAllFolded}
        onClick={handleHide}
      />
    </div>
  );
}
