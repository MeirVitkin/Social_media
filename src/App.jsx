import { useForm } from "react-hook-form";
import { useState } from "react";
import AppTest from "./AppTest";

const App = () => {
  const { register, handleSubmit } = useForm();
  const [isLog, setIslog] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const FETCH_API = 'http://localhost:3500';

  const onSubmit = async (data) => {
    try {
      const usernameExists = await checkUsernameExists(data.UserName);

      if (usernameExists) {
        if (usernameExists.website === data.password) {
          setUser(usernameExists);
          setIslog(!isLog);
        } else {
          setError("Invalid password");
        }
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const checkUsernameExists = async (userName) => {
    const response = await fetch(`${FETCH_API}/users`);
    const data = await response.json();
    console.log(data);
    const usernameExists = await data.find((user) => user.username === userName);

    if (usernameExists) {
    } else {
      ; setError("Username does not exist");
      return;
    }
    return usernameExists;
  };

  return (
    <div className="pageConntainer">
      <div className="h1Container">
        <h1 className="socialMediaHeader">M & M </h1>
        <h1 className="userNameHeader">{user?.name}</h1>
      </div>
      {isLog && (
        <nav>
          <AppTest id={user.id} />
        </nav>
      )}
      {!isLog && (
        <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="error">{error}</p>}
          <input className="Input" type="text" placeholder="User name.." {...register("UserName")} />
          <input className="Input" type="text" placeholder="password.." {...register("password")} />
          <input className="myInput" type="submit" />
        </form>
      )}

    </div>
  )
}


export default App