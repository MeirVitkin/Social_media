import { useState } from "react";
import Nav from "./Nav";
import Login from "./component/Login";

const App = () => {
  const [isLog, setIslog] = useState(false);
  const [user, setUser] = useState(null);

  return (

    <div className="pageConntainer">

      <div className="h1Container">
        <h1 className="socialMediaHeader">M & M </h1>
        <h1 className="userNameHeader">{user?.name}</h1>
      </div>
      {isLog && (
        <nav>
          <Nav id={user.id} />
        </nav>
      )}
      {!isLog && (
        <Login
          setIslog={setIslog}
          setUser={setUser}
          isLog={isLog}
        />
      )}

    </div>
  )
}


export default App