import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

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
        <h3>Ask me Mortgage</h3>
        <form>
          <input
            type="text"
            name="question"
            placeholder="Enter a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleClick} disabled={isLoading}>{isLoading ? 'Thinking...' : 'Submit'}</button>
          </form>

        <div className={styles.question}>{lastQuestion}</div>
        <div className={styles.result}>{ <div dangerouslySetInnerHTML={{__html: result}} />}</div>

        <h4>People also ask</h4>
          <div className={styles.faq}>
            <q onClick={handleFAQ}>What is the down payment criteria on an FHA loan ?</q>
            <q onClick={handleFAQ}>What is the minimum down payment for a house in Wisconsin?</q>
            <q onClick={handleFAQ}>How soon can you get a mortgage after Chapter 13 discharge?</q>
            <q onClick={handleFAQ}>How long after Chapter 13 Can I get FHA?</q>
          </div>

      </main>
    </div>
  );
}
