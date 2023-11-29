import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = () => {
    console.log("User registered:", registrationData);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("your full name is required!"),
    email: yup.string().email().required("put an email!!!!!!"),
    age: yup.number().positive().integer().min(18).required("whattttt!"),
    password: yup.string().min(4).max(8).required("you need 4 chars"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password d'ont match!!!")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {

    console.log(data);
  }

  return (
    <div className="inputs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="registerInput" type="text" placeholder="Full name.." {...register("fullName")} />
        <p>{errors.fullName?.message}</p>
        <input className="registerInput" type="text" placeholder="email.." {...register("email")} />
        <p>{errors.email?.message}</p>
        <input className="registerInput" type="number"  placeholder="age.." {...register("age")} />
        <p>{errors.age?.message}</p>
        <input className="registerInput" type="text" placeholder="password.." {...register("password")} />
        <p>{errors.password?.message}</p>
        <input className="registerInput" type="text" placeholder="Confirm password.." {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default Register;