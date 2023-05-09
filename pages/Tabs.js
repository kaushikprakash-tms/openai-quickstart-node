import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const Tabs = ({ children, loading }) => {

  if (!children) {
    return null;
  }

  const [activeTab, setActiveTab] = useState(0);
  const tabList = children.filter(child => child.type.name === 'TabList')[0];
  const tabPanels = children.filter(child => child.type.name === 'TabPanel');
  const newTabList = React.cloneElement(tabList, { activeTab, setActiveTab });

  useEffect(() => {
    if (loading) {
      setActiveTab(-1);
    } else if (activeTab === -1) {
      setActiveTab(0);
    }
  }, [loading]);

  return (
    <div className={styles.tabs}>
      {newTabList}
      {loading ? (
        <div>Loading...</div>
      ) : (
        tabPanels[activeTab]
      )}
    </div>
  );
};

export default Tabs;
