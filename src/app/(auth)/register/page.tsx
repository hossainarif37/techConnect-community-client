"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/common/Input/InputWithLabel";
import { useRegisterMutation } from "@/redux/api/endpoints/users/users";
import toast from "react-hot-toast";

interface IFormInput {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const router = useRouter();
    const [registerUser, { isLoading, isError, error }] = useRegisterMutation();


    //* hanle login function
    const handleRegister = (data: IFormInput) => {
        const registerResponse = registerUser({ name: data.name, email: data.email, password: data.password }).unwrap();

        toast.promise(registerResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                router.push('/login');
                return message;

            },
            error: ({ data }) => {
                console.log(data)
                return data?.message || 'Registration failed';
            },
        });
    }




    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
        >
            {/*//* Title */}
            {/* <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-700 text-center">Register</h1> */}

            <div className="flex flex-col gap-y-7 mb-5">

                {/*//* Name */}
                <div>
                    <Input
                        label='Name'
                        type='name'
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
                                required: 'Email is required', pattern: {
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
                                required: 'Password is required', minLength: {
                                    value: 6,
                                    message: 'Provide minimum 6 characters longer'
                                }
                            })
                        }}
                    />
                    {/*//! error */}
                    <p className="error">{errors?.password?.message}</p>
                </div>

                {/* //*Submit Button */}
                <button
                    type="submit"
                    className="btn bg-primary text-white"
                >
                    Register
                </button>

            </div>

            {/*//* Navigate to Register page */}
            <p className="text-center">
                <span>Already have an account? <Link className="text-primary underline" href='/login'>Login</Link></span>
            </p>

        </form>
        // </section>
    );
};

export default Register;