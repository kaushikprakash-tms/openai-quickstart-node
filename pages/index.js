import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import AskAI from "./AskAI";
import RunScenario from "./RunScenario"
import Tabs from './Tabs'
import TabList from './TabList';
import Tab from './Tab';
import TabPanel from './TabPanel';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  
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

          {/* <Tabs>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanel>Panel 1</TabPanel>
            <TabPanel>Panel 2</TabPanel>
            <TabPanel>Panel 3</TabPanel>
          </Tabs> */}

        </div>
      </main>
    </div>
  );
}
