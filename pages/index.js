import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import AskAI from "./AskAI";
import RunScenario from "./RunScenario"
import Tabs from './Tabs'
import TabList from './TabList';
import Tab from './Tab';
import TabPanel from './TabPanel';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Head>
        <title>TMS AI</title>
        <link rel="icon" href="/tms.png" />
      </Head>

      <main className={styles.main}>
        <img src="/New_TMS_Logo_Standard.png" className={styles.logo} />
        <div className="App">
            <Tabs loading={isLoading}>
              <TabList>
                <Tab>Ask AI</Tab>
                <Tab>Run a Scenario</Tab>
              </TabList>
              <TabPanel>
                <AskAI/>
              </TabPanel>
              <TabPanel>
                <RunScenario />
              </TabPanel>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
