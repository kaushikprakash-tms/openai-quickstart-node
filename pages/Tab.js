import React from 'react';
import styles from './index.module.css';

const Tab = ({ children, isActive, onClick }) => {
  return (
    <button
      className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Tab;
