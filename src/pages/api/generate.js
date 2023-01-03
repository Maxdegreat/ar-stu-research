import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: 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,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "write 200 word essay explaining: attention rate is found based on how long tensorflow.js can use pose estimation to detect your eyes and nose.", // generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
