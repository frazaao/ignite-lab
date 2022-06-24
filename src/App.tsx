import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { client } from "./lib/apollo";
import Router from "./Router";

function App() {
  return (
    <ApolloProvider client={client} >
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
        redirectUri={window.location.origin + '/event'}
      >    
        <Router />
      </Auth0Provider>  
    </ApolloProvider>
  )
}

export default App
