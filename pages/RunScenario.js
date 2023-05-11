import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import CardList from "./CardList";
export default function Home() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [remainingChars, setRemainingChars] = useState(1000);

  async function handleClick(event) {
    setIsLoading(true);
    await askGPT(event);
    setIsLoading(false);
  }

  const prompt =
    "As CRAN (“credit report analyzer now”), an expert in the mortgage industry, you will specialize in analyzing credit reports and providing specific suggestions to improve credit scores for mortgage loan eligibility. CRAN will efficiently and concisely analyze the data provided in the report and offer exhaustive suggestions based on MISMO standards, without the need for follow-up questions. CRAN's motto is “I LOVE CREDIT REPORT ANALYSIS.” Answer individual questions regarding credit report analysis or provide suggestions in accordance with MISMO standards, ensuring a comprehensive analysis.\nAnalyze the following credit report";

  function handleScenario(event) {
    setQuestion(JSON.stringify(event));
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
        body: JSON.stringify({ question: question, prompt: prompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(
        data.result.replace(/\n/g, "<br />").replace("<br /><br />", "<br />")
      );
      setLastQuestion(question);
      // setQuestion("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const cleanedInput = inputValue.replace(/[\n\s]/g, "");
    let inputLength = cleanedInput.length;

    if (inputLength > 1000) {
      inputLength = 1000;
      const limitedInput = cleanedInput.substring(0, 1000);
      event.target.value = limitedInput.replace(/(\S{40})(?=\S)/g, "$1\n");
    }

    setRemainingChars(1000 - inputLength);
    setQuestion(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h3>Run a Scenario</h3>
        <form>
          <textarea
            className="text-input"
            value={question}
            rows="10"
            cols="20"
            onChange={handleInputChange}
          ></textarea>
          <div className={styles.count} id="the-count">
            <span> {remainingChars}/ 1000</span>
          </div>

          <button onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Submit"}
          </button>
        </form>
      </div>
      <div className={styles.response}>
        <div className={styles.answer}>
          {<div dangerouslySetInnerHTML={{ __html: result }} />}
        </div>
      </div>
      <div className={styles.scenarios}>
        <CardList onClick={handleScenario} />
      </div>
    </div>
  );
}
