import React, { useEffect, useState } from "react";
import AgoraUIKit from "agora-react-uikit";

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [token, setToken] = useState({});

  useEffect(() => {
    console.log("App useEffect triggered, videoCall:", videoCall);
    if (videoCall) {
      fetch("http://localhost:3000/rtc/hello/audience/userAccount/1")
        .then((res) => res.json())
        .then((data) => {
          console.log("fetch promise resolved, data:", data);
          setToken(data);
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
        });
    }
  }, [videoCall]);

  const rtcProps = {
    appId: "5661743339a649f1ba6bbb2de4c1cab0",
    channel: "hello", // your agora channel
    token: token.rtcToken, // Use token.rtcToken here assuming your token object has a property named rtcToken
    userID: "1",
    role: "audience",
  };

  const callbacks = {
    EndCall: () => {
      console.log("EndCall callback triggered");
      setVideoCall(false);
    },
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3
      onClick={() => {
        console.log("StartCall clicked");
        setVideoCall(true);
      }}
    >
      Start Call
    </h3>
  );
};

export default App;
