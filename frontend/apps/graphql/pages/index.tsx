import { ApolloExplorerReact } from "@apollo/explorer";

export default function Explorer() {
  return (
    <ApolloExplorerReact
      className="apollo-explorer"
      graphRef="startup-example@current"
      endpointUrl="http://localhost:8000/graphql/"
      initialState={{
        displayOptions: {
          showHeadersAndEnvVars: true,
        },
      }}
    />
  );
}
