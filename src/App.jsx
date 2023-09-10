import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://uubdvbdeelvmuzoyfrhe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YmR2YmRlZWx2bXV6b3lmcmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyODU5MzksImV4cCI6MjAwOTg2MTkzOX0.kdusPT9cWkmPMYariCKQ4aTmcmNLuCX-osR5YCG8MyI"
);

// Define the main functional component 'App'
function App() {
  // Declare a 'session' state variable using the 'useState' hook, initialized as 'null'
  const [session, setSession] = useState(null);

  // Use the 'useEffect' hook to run code after the component has mounted
  useEffect(() => {
    // Fetch the user's session using Supabase and update the 'session' state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Set up an event listener for authentication state changes using Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Update the 'session' state when the authentication state changes
      setSession(session);
    });

    // Cleanup function to unsubscribe from the event listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once, like componentDidMount

  // Conditional rendering based on whether a user session exists
  if (!session) {
    // If there is no session, render the authentication component
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["discord"]}
        theme="dark"
      />
    );
  } else {
    // If there is a session, render a simple "Logged in!" message
    return <div>Logged in!</div>;
  }
}

export default App;
