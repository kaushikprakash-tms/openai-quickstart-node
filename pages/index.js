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
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
    
  async function handleClick(event) {
    setIsLoading(true);
    await askGPT(event);
    setIsLoading(false);
  }

  function handleFAQ(event) {
    setQuestion(event.target.innerText);
    // setIsLoading(false);
  }
  async function askGPT(event) {
    event.preventDefault();
    setLastQuestion("");
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replace(/\n/g, "<br />").replace("<br /><br />","<br />"));
      setLastQuestion(question);
      setQuestion("");

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  
  return (
    <div>
      <Head>
        <title>TMS AI</title>
        <link rel="icon" href="/tms.png" />
      </Head>

      <main className={styles.main}>
        <img src="/New_TMS_Logo_Standard.png" className={styles.logo} />
        <div className="App">
            <Tabs>
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
