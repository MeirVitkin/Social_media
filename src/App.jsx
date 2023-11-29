import { useForm } from "react-hook-form";
import { useState } from "react";
import AppTest from "./AppTest";
import Register from "./component/Register";

const App = () => {
  const { register, handleSubmit } = useForm();
  const [isLog, setIslog] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const FETCH_API = 'http://localhost:3500';
  const [user, setUser] = useState(null);


  const onSubmit = (data) => {
    const usernameExists = checkUsernameExists(data.UserName);

    if (usernameExists) {
      setIslog(!isLog); 
    } else {
      setExistingUser(true);
      setIsRegister(true);
    }
  };

  const checkUsernameExists = async () => {
    const response = await fetch(`${FETCH_API}/users`);
    const data = await response.json();
    setUser(data[0])
    return true; 
  };

  return (
    <div>
      <h1>M & M <p className="headerP">social media</p></h1>
      <h1>{user?.name}</h1>
      {isLog && (
        <>
        <AppTest />
        </>
      )}
      {!isLog && !isRegister && (
        <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
          <input className="Input" type="text" placeholder="User name.." {...register("UserName")} />
          <input className="Input" type="text" placeholder="password.." {...register("password")} />
          <input className="myInput" type="submit" />
        </form>
      )}

      {existingUser && isRegister && (
        <Register />
      )}
    </div>
  )
}

export default App