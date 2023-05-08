import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [remainingChars, setRemainingChars] = useState(500);

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
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(
        data.result.replace(/\n/g, "<br />").replace("<br /><br />", "<br />")
      );
      setLastQuestion(question);
      setQuestion("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const handleInputChange = (event) => {
    const inputLength = event.target.value.length;
    setRemainingChars(500 - inputLength);
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
            maxLength="500"
            rows="10"
            cols="20"
            onChange={handleInputChange}
          ></textarea>
          <div className={styles.count} id="the-count">
            <span> {remainingChars}/ 500</span>
          </div>

          <button onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Submit"}
          </button>
        </form>
      </div>
      <div className={styles.response}>
        <div className={styles.responseQuestion}>{lastQuestion}</div>
        <div className={styles.answer}>
          {<div dangerouslySetInnerHTML={{ __html: result }} />}
        </div>
      </div>
    </div>
  );
}
