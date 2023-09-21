/* import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
  } from "@clerk/clerk-react";
  import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
   
  const clerkPubKey = "pk_test_ZW1pbmVudC1zbmFwcGVyLTU0LmNsZXJrLmFjY291bnRzLmRldiQ";
   
  function PublicPage() {
    return (
      <>
        <h1>Public page</h1>
        <a href="/protected">Go to protected page</a>
        <UserButton />
      </>
    );
  }
   
  function ProtectedPage() {
    return (
      <>
        <h1>Protected page</h1>
        <UserButton />
      </>
    );
  }
   
  function ClerkProviderWithRoutes() {
    return (
      <>
        Header
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route
            path="/sign-in*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="/protected"
            element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
               <SignedOut>
                <RedirectToSignIn />
             </SignedOut>
            </>
            }
          />
        </Routes>
      </>
    );
  }
   
  function Auth() {
    return (
        <ClerkProviderWithRoutes />
    );
  }
   
  export default Auth; */