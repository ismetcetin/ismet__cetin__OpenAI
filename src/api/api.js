import axios from "axios";

const BASE__URL =
"https://api.openai.com/v1/engines/text-curie-001/completions";
const APP__KEY = process.env.REACT_APP_KEY;


export const apiUtils = {
    postPrompt : (prompt) => axios
    .post(
      BASE__URL,
      {
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APP__KEY}`,
        },
      }
    )
}
