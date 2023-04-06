import assert from "assert";
import { OpenAI } from "langchain";
import { loadPrompt } from "langchain/prompts";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings, CohereEmbeddings } from "langchain/embeddings";
import { InMemoryDocstore, Document } from "langchain/docstore";
import { CSVLoader } from "langchain/document_loaders";

// Test exports
assert(typeof OpenAI === "function");
assert(typeof loadPrompt === "function");
assert(typeof HNSWLib === "function");

// Test that Node can see Node-only exports
assert(typeof CohereEmbeddings === "function");

// Test dynamic imports of peer dependencies
const { HierarchicalNSW } = await HNSWLib.imports();

const vs = new HNSWLib(new OpenAIEmbeddings({ openAIApiKey: "sk-XXXX" }), {
  space: "ip",
  numDimensions: 3,
  docstore: new InMemoryDocstore(),
  index: new HierarchicalNSW("ip", 3),
});

await vs.addVectors(
  [
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    new Document({
      pageContent: "a",
    }),
    new Document({
      pageContent: "b",
    }),
  ]
);

assert((await vs.similaritySearchVectorWithScore([0, 0, 1], 1)).length === 1);

// Test CSVLoader
const loader = new CSVLoader(new Blob(["a,b,c\n1,2,3\n4,5,6"]));

const docs = await loader.load();

assert(docs.length === 2);
