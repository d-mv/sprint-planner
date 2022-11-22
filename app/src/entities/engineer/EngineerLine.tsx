import { ifTrue, Optional } from '@mv-d/toolbelt';

import { CONSTANTS } from '../../shared';
import { CountOfCount } from './CountOfCount';
import { EngineerActions } from './EngineerActions';
import { EngineerName } from './EngineerName';

interface Props {
  showActions: boolean;
  isOpen: Optional<string>;
  toggleIsOpen: (arg0: string) => void;
}

export function EngineerLine({ showActions, isOpen, toggleIsOpen }: Props) {
  const renderActions = () => <EngineerActions isOpen={isOpen} toggleIsOpen={toggleIsOpen} />;

  return (
    <div
      className='align-center w-100 padding-1'
      style={{ backgroundColor: CONSTANTS.engineerLineColor, height: '4rem' }}
    >
      <EngineerName />
      {ifTrue(showActions, renderActions)}
      <CountOfCount />
    </div>
  );
}
