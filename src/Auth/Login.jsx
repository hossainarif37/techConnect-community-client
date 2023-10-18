import { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

const Login = () => {
    const {register,handleSubmit,formState: { errors }} = useForm();

    const  handleLogin =(data)=>{
        console.log(data);
    }
    return (
        <section className="h-screen flex items-center">
            <form
            onSubmit={handleSubmit(handleLogin)}
             className="lg:w-[450px] mx-auto rounded shadow-lg p-10"
             >
                <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-primary text-center">Login</h1>
                <div className="flex flex-col gap-y-7">
                    {/*//* Email */}
                    <Input
                        label='Email'
                        type='email'
                        name='email'
                        register={{...register('email')}}
                    />
                    {/*//* Password */}
                    <Input
                        label='Password'
                        type='password'
                        name='password'
                        register={{...register('password')}}
                    />
                    <button
                        type="submit"
                        className="btn bg-primary text-white"
                    >Login</button>
                    
                </div>
            </form>
        </section>
    );
};

export default Login;