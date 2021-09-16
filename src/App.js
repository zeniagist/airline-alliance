import React from "react";

import NavigationBar from "./NavigationBar";
import AirlinesContainer from "./AirlinesContainer";

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="title">Airlines</div>
      <AirlinesContainer />
    </div>
  );
}

export default App;
