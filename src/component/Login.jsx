import {useState} from 'react'
import { useForm } from "react-hook-form";


const Login = ({setUser,setIslog,isLog}) => {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();


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
        const response = await fetch('http://localhost:3500/users');
        const data = await response.json();
        console.log(userName);
        console.log(data);
        const usernameExists = await data.find((user) => user.username === userName);
    
        if (usernameExists) {
            return usernameExists;
        } else {
          ; setError("Username does not exist");
          return;
        }
      };
  return (
    <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="error">{error}</p>}
          <input className="Input" type="text" placeholder="User name.." {...register("UserName")} />
          <input className="Input" type="text" placeholder="password.." {...register("password")} />
          <input className="myInput" type="submit" />
        </form>
  )
}

export default Login