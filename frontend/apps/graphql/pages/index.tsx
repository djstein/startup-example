import { ApolloExplorerReact } from "@apollo/explorer";
import { schema } from "sdk";

export default function Explorer() {
  return (
    <ApolloExplorerReact
      className="apollo-explorer"
      schema={schema}
      endpointUrl="http://localhost:8000/graphql/"
      initialState={{
        displayOptions: {
          showHeadersAndEnvVars: true,
        },
      }}
    />
  );
}
