import { Amplify } from "aws-amplify";
import { Authenticator, Alert } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "./dashboard/Dashboard";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

export default function Admin() {
  return (
    <Authenticator className="authenticator-box">
      <Dashboard />
    </Authenticator>
  );
}
