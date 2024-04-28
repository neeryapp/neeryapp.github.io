import logo from "./logo_text.svg";
import "./App.css";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const API_ROOT = "https://khronos.neery.net";

export async function _fetch(path, options = {}) {
  const headers = {};

  if (options.method === undefined) {
    if (options.data !== undefined && options.data !== null) {
      options.method = "POST";
    } else {
      options.method = "GET";
    }
  }

  let body = undefined;

  if (options.data !== undefined && options.data !== null) {
    if (options.data instanceof FormData) {
      body = options.data;
    } else {
      headers["Content-Type"] = "application/json";
      body =
        typeof options.data === "string"
          ? options.data
          : JSON.stringify(options.data);
    }
  }

  const req = await fetch(API_ROOT + path, {
    method: options.method,
    headers,
    body,
    cache: options.cache ?? "no-cache",
    next: options.next,
  });

  if (req.status >= 400) {
    const err = {
      status: req.status,
      body: await req.text(),
    };

    try {
      err.body = JSON.parse(err.body);
    } catch (e) {}

    throw JSON.stringify(err);
  }

  return await req.json();
}

export async function authGoogle(data, options) {
  return await _fetch("/auth/google", {
    method: "POST",
    data,
    ...options,
  });
}

function InsideOauth() {
  const [thankyou, setThankYou] = useState(false);

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read",
    onSuccess: async (res) => {
      await authGoogle({
        access_token: res.access_token,
        is_customer: true,
      });
      setThankYou(true);
    },
  });
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      {thankyou ? (
        <p style={{ margin: "10px 0", textAlign: "center" }}>
          Köszönjük, hogy feliratkoztál, hamarosan jelentkezünk az egyedi
          oldaladdal!
          <br />
          <br />
          Thank you for subscribing, we'll be back soon with your unique page!
        </p>
      ) : (
        <>
          <p style={{ margin: "10px 0", textAlign: "center" }}>
            Hamarosan, de hogy biztosan ne maradj le, iratkozz fel, hogy a
            jövőben követhesd foglalásaidat, vagy egyedi kedvezményekben
            részesülhess.
            <br />
            <br />
            Coming Soon, but to make sure you don't miss out, subscribe so you
            can track your bookings in the future or receive special discounts.
          </p>
          <button id="places" onClick={login}>
            Sign In With Google
            <img
              src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MzguNiAyNzguNmwtMTYwIDE2MEMyNzIuNCA0NDQuOSAyNjQuMiA0NDggMjU2IDQ0OHMtMTYuMzgtMy4xMjUtMjIuNjItOS4zNzVjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVMMzM4LjggMjg4SDMyQzE0LjMzIDI4OCAuMDAxNiAyNzMuNyAuMDAxNiAyNTZTMTQuMzMgMjI0IDMyIDIyNGgzMDYuOGwtMTA1LjQtMTA1LjRjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVzMzIuNzUtMTIuNSA0NS4yNSAwbDE2MCAxNjBDNDUxLjEgMjQ1LjkgNDUxLjEgMjY2LjEgNDM4LjYgMjc4LjZ6Ii8+PC9zdmc+"
              id="arrow"
              alt="arrow"
            />
          </button>

          <br />
          <br />
          <p style={{ margin: "10px 0", textAlign: "center" }}>
            Ha, étterem vagy és regisztrálni szeretnél, akkor ide kattints.
            <br />
            If you are a restaurant and wants to register, click here
          </p>
          <button
            id="places"
            onClick={() =>
              window.open("https://places.neery.net", "_blank", "noreferrer")
            }
          >
            Éttermeknek / For restaurants
            <img
              src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MzguNiAyNzguNmwtMTYwIDE2MEMyNzIuNCA0NDQuOSAyNjQuMiA0NDggMjU2IDQ0OHMtMTYuMzgtMy4xMjUtMjIuNjItOS4zNzVjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVMMzM4LjggMjg4SDMyQzE0LjMzIDI4OCAuMDAxNiAyNzMuNyAuMDAxNiAyNTZTMTQuMzMgMjI0IDMyIDIyNGgzMDYuOGwtMTA1LjQtMTA1LjRjLTEyLjUtMTIuNS0xMi41LTMyLjc1IDAtNDUuMjVzMzIuNzUtMTIuNSA0NS4yNSAwbDE2MCAxNjBDNDUxLjEgMjQ1LjkgNDUxLjEgMjY2LjEgNDM4LjYgMjc4LjZ6Ii8+PC9zdmc+"
              id="arrow"
              alt="arrow"
            />
          </button>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <div className="App" id="top-layer">
      <GoogleOAuthProvider clientId="967601156077-fmln04jgp3ri25e60c2dkksb9d5bvbco.apps.googleusercontent.com">
        <InsideOauth />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
