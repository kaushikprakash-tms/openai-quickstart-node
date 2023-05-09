import React from 'react';
import styles from './index.module.css';

const TabList = ({ children, activeTab, setActiveTab }) => {
  if (!children || children.length === 0) {
    return null;
  }

  const tabs = children.map((child, index) =>
    React.cloneElement(child, {
      key: index,
      isActive: index === activeTab,
      onClick: () => setActiveTab(index),
      type: 'button'
    })
  );

  return <div className={styles.tabHeaders}>{tabs}</div>;
};

export default TabList;
