import { useState } from "react";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../hooks/useApi";
import Modal from "../../components/common/Modal";
import toast from "react-hot-toast";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [customError, setCustomError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    //* hanle register function
    const handleRegister = (data) => {
        if (data.confirmPassword !== data.password) {
            return setCustomError('Password not matched!')
        }
        setCustomError('');
        //* Store data in the database
        postData('/api/auth/register', {
            name: data.name,
            email: data.email,
            password: data.confirmPassword
        })
            .then(result => {
                console.log(result);
                if (result.success) {
                    reset();
                    setIsModalOpen(true);
                    // navigate('/login');
                } else {
                    toast.error(result.error);
                }
            })
    }
    return (
        <section className="h-screen flex items-center">
            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}

            />
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="lg:w-[470px] mx-auto rounded-lg shadow-lg p-10"
            >
                {/*//* Title */}
                <h1 className="text-3xl text-gray-700 font-bold mb-10 text-center">Create your account</h1>

                <div className="flex flex-col gap-y-5 mb-5">
                    {/*//* Name */}
                    <div>
                        <Input
                            label='Name'
                            type='text'
                            id='name'
                            register={{
                                ...register('name', {
                                    required: 'Name is required',
                                    maxLength: {
                                        value: 20,
                                        message: 'Maximum length 20 characters'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum length 3 characters'
                                    }
                                })
                            }}
                        />
                        {/*//! error */}
                        <p className="error">{errors?.name?.message}</p>
                    </div>

                    {/*//* Email */}
                    <div>
                        <Input
                            label='Email'
                            type='email'
                            id='email'
                            register={{
                                ...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Provide a valid email'
                                    }
                                })
                            }}
                        />
                        {/*//! error */}
                        <p className="error">{errors?.email?.message}</p>
                    </div>

                    {/*//* Password */}
                    <div>
                        <Input
                            label='Password'
                            type='password'
                            id='password'
                            register={{
                                ...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Provide minimum 6 characters longer'
                                    }
                                })
                            }}
                        />
                        {/*//! error */}
                        <p className="error">{errors?.password?.message}</p>
                    </div>

                    {/*//* Confirm Password */}
                    <div>
                        <Input
                            label='Confirm Password'
                            type='password'
                            id='confirmPassword'
                            register={{
                                ...register('confirmPassword', {
                                    required: 'Confirm password is required', minLength: {
                                        value: 6,
                                        message: 'Provide minimum 6 characters longer'
                                    }
                                })
                            }}
                        />
                        {/*//! error */}
                        <p className="error">{errors?.confirmPassword?.message || customError}</p>
                    </div>
                    {/*//* Submit Button */}
                    <button
                        type="submit"
                        className="btn bg-primary text-white"
                    >Register</button>

                </div>
                {/*//* Navigate to Login page */}
                <p className="text-center"><span>Already have an account? <Link className="text-primary underline" to='/login'>Login</Link></span></p>
            </form>
        </section>
    );
};

export default Register;