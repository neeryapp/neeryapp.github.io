import logo from "./logo_text.svg";
import "./App.css";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function InsideOauth() {
  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read",
    onSuccess: async (res) => {
      console.log(res);
    },
  });
  return (
    <button id="places" onClick={login}>
      Sign In With Google
      <img
        src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MzguNiAyNzguNmwtMTYwIDE2MEMyNzIuNCA0NDQuOSAyNjQuMiA0NDggMjU2IDQ0OHMtMTYuMzgtMy4xMjUtMjIuNjItOS4zNzVjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVMMzM4LjggMjg4SDMyQzE0LjMzIDI4OCAuMDAxNiAyNzMuNyAuMDAxNiAyNTZTMTQuMzMgMjI0IDMyIDIyNGgzMDYuOGwtMTA1LjQtMTA1LjRjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVzMzIuNzUtMTIuNSA0NS4yNSAwbDE2MCAxNjBDNDUxLjEgMjQ1LjkgNDUxLjEgMjY2LjEgNDM4LjYgMjc4LjZ6Ii8+PC9zdmc+"
        id="arrow"
        alt="arrow"
      />
    </button>
  );
}

function App() {
  return (
    <div className="App" id="top-layer">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <GoogleOAuthProvider clientId="967601156077-fmln04jgp3ri25e60c2dkksb9d5bvbco.apps.googleusercontent.com">
        <InsideOauth />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
