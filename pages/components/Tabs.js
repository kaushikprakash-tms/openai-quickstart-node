import React, { useState } from 'react';
import styles from '../index.module.css';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabList = children.filter(child => child.type.name === 'TabList')[0];
  const tabPanels = children.filter(child => child.type.name === 'TabPanel');

  const newTabList = React.cloneElement(tabList, { activeTab, setActiveTab });

  return (
    <div className={styles.tabs}>
      {newTabList}
      {tabPanels[activeTab]}
    </div>
  );
};

export default Tabs;