import { CSSProperties } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { FormTypes } from '../../models';

export default function Spacer() {
  const { item } = useContextSelector(FormItemContext, c => c);

  const { type, style } = item;

  function getStyle(): CSSProperties {
    if (type === FormTypes.V_SPACER) return { width: '1rem', height: '.1rem' };

    return { width: '.1rem', height: '1rem' };
  }

  return <div style={{ ...getStyle(), ...style }} />;
}
