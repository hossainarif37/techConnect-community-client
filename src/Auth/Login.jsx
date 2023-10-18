import { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log(data);
    }
    return (
        <section className="h-screen flex items-center">
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="lg:w-[450px] mx-auto rounded shadow-lg p-10"
            >
                <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-800 text-center">Login</h1>
                <div className="flex flex-col gap-y-7 mb-5">
                    <div>
                        {/*//* Email */}
                        <Input
                            label='Email'
                            type='email'
                            name='email'
                            register={{
                                ...register('email', {
                                    required: 'Email is required', pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Provide a valid email'
                                    }
                                })
                            }}
                        />
                        <p className="error">{errors?.email?.message}</p>
                    </div>
                    <div>
                        {/*//* Password */}
                        <Input
                            label='Password'
                            type='password'
                            name='password'
                            register={{
                                ...register('password', {
                                    required: 'Password is required', minLength: {
                                        value: 6,
                                        message: 'Provide minimum 6 characters longer'
                                    }
                                })
                            }}
                        />
                        <p className="error">{errors?.password?.message}</p>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-primary text-white"
                    >Login</button>

                </div>
                <p className="text-center"><span>Don't have an account? <Link className="text-primary underline" to='/register'>Create an account</Link></span></p>
            </form>
        </section>
    );
};

export default Login;