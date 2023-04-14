import { Amplify } from "aws-amplify";
import Container from "@mui/material/Container";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

export default function Admin() {
  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "50px", paddingBottom: "100px" }}
    >
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </Container>
  );
}
