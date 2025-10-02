import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-5",
  input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);

const TestOpenai = () => {
  return <div>{response.output_text}</div>;
};

export default TestOpenai;
