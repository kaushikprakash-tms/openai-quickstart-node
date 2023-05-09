import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let prompt =
    "The following is a conversation with a mortgage AI assistant built by Total Mortgage. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who is this?\nAI: I am an AI created by Total Mortgage. How can I help you today?\n";

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const question = req.body.question || "";
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  if (req.body.prompt.trim().length > 0) {
    prompt = req.body.prompt;
  }

  try {
    const completion = await openai.createCompletion({
      prompt: prompt + question,
      model: "text-davinci-003",
      temperature: 0.4,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
