import { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customError, setCustomError] = useState('');

    const handleRegister = (data) => {
        if (data.confirmPassword !== data.password) {
            return setCustomError('Password not matched!')
        }
        setCustomError('');
    }
    return (
        <section className="py-20 flex items-center">
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="lg:w-[470px] mx-auto rounded-lg shadow-lg p-10"
            >
                {/*//* Title */}
                <h1 className="text-3xl text-gray-800 font-bold mb-10 text-center">Create your account</h1>
                <div className="flex flex-col gap-y-5 mb-5">
                    {/*//* Name */}
                    <div>
                        <Input
                            label='Name'
                            type='text'
                            register={{ ...register('name', { required: 'Name is required', maxLength: 20, min: 3 }) }}
                        />
                        <p className="error">{errors?.name?.message}</p>
                    </div>
                    {/*//* Email */}
                    <div>
                        <Input
                            label='Email'
                            type='email'
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
                    {/*//* Password */}
                    <div>
                        <Input
                            label='Password'
                            type='password'
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
                    {/*//* Confirm Password */}
                    <div>
                        <Input
                            label='Confirm Password'
                            type='password'
                            register={{
                                ...register('confirmPassword', {
                                    required: 'Confirm password is required', minLength: {
                                        value: 6,
                                        message: 'Provide minimum 6 characters longer'
                                    }
                                })
                            }}
                        />
                        <p className="error">{errors?.confirmPassword?.message || customError}</p>
                    </div>
                    <button
                        type="submit"
                        className="btn bg-primary text-white"
                    >Register</button>

                </div>
                <p className="text-center"><span>Already have an account? <Link className="text-primary underline" to='/login'>Login</Link></span></p>
            </form>
        </section>
    );
};

export default Register;