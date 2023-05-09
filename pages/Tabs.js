import React, { useState } from 'react';
import styles from './index.module.css';

const Tabs = ({ children }) => {

  if(!children){
    return;
  }
  
  const [activeTab, setActiveTab] = useState(0);

  const tabList = children.find(child => child.type.name === 'TabList');
  const tabPanels = children.filter(child => child.type.name === 'TabPanel');


  if (!tabList) {
    throw new Error('TabList component is missing');
  }

  return (
    <div className={styles.tabs}>
      {React.cloneElement(tabList, { activeTab, setActiveTab })}
      {tabPanels[activeTab]}
    </div>
  );
};

export default Tabs;
