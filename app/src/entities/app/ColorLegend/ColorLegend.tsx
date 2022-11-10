import { Typography } from '@mui/material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import clsx from 'clsx';

import { CONFIG } from '../../../config';
import classes from './ColorLegend.module.scss';

export function ColorLegend() {
  const itemClass = clsx('line', classes.item);

  return (
    <div className={classes.container}>
      <div className='line s-around w-100'>
        <div className='column s-around h-100 w-100'>
          <div className={itemClass}>
            <span style={{ backgroundColor: CONFIG.colors.work.backgroundColor }} />
            <Typography variant='body2'>work day</Typography>
          </div>
          <div className={itemClass}>
            <span
              style={{
                backgroundColor: CONFIG.colors.weekend.backgroundColor,
              }}
            />
            <Typography variant='body2'>weekend</Typography>
          </div>
        </div>
        <div className='column s-around h-100 w-100'>
          <div className={itemClass}>
            <span style={{ backgroundColor: CONFIG.colors.commonOff.backgroundColor }} />
            <Typography variant='body2'>holiday</Typography>
          </div>
          <div className={itemClass}>
            <span style={{ backgroundColor: CONFIG.colors.off.backgroundColor }} />
            <Typography variant='body2'>day off</Typography>
          </div>
        </div>
        <div className='column s-around h-100 w-100'>
          <div className={itemClass}>
            <span className='center' style={{ border: CONFIG.colors.border, borderColor: CONFIG.colors.todayBorder }}>
              <TodayOutlinedIcon />
            </span>
            <Typography variant='body2'>today</Typography>
          </div>
          <div className={itemClass}></div>
        </div>
      </div>
    </div>
  );
}
