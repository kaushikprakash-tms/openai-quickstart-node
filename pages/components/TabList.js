import React from 'react';
import styles from '../index.module.css';

const TabList = ({ children, activeTab, setActiveTab }) => {
  const tabs = children.map((child, index) =>
    React.cloneElement(child, {
      isActive: index === activeTab,
      onClick: () => setActiveTab(index),
    })
  );

  return <div className={styles.tabHeaders}>{tabs}</div>;
};

export default TabList;