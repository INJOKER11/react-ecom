import React from 'react';

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {
  return (
      <div>
        <h1 className={styles.root}>
          :(
          <br/>
          Not found
        </h1>
      </div>
  );
};

