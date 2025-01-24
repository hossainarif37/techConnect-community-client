"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/api/endpoints/users/users";
import toast from "react-hot-toast";
import InputWithLabel from "@/components/common/Input/InputWithLabel";
import PrimaryButton from "@/components/common/Button/PrimaryButton";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user/userSlice";
import Cookies from "js-cookie";

interface IFormInput {
    name: string;
    email: string;
    password: string;
}

const Register = ({ isLoginComponent, setIsLoginComponent }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const router = useRouter();
    const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
    const dispatch = useDispatch();


    //* hanle login function
    const handleRegister = (data: IFormInput) => {
        const registerResponse = registerUser({ name: data.name, email: data.email, password: data.password }).unwrap();

        toast.promise(registerResponse, {
            loading: 'Loading',
            success: (data: any) => {
                const { user, message, token } = data;
                dispatch(setUser({ user, isAuthenticated: true }));
                Cookies.set('authToken', token, { expires: 30 });
                return message;
            },
            error: ({ data }) => {
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
                    <InputWithLabel
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
                    <InputWithLabel
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
                    <InputWithLabel
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
                <PrimaryButton
                    type="submit"
                    className="bg-gradient-to-r from-[#079EF2] to-blue-primary text-white"
                >
                    Register
                </PrimaryButton>

            </div>

            {/*//* Navigate to Register page */}
            <p className="text-center text-white">
                <span>Already have an account? <button
                    type="button"
                    onClick={() => setIsLoginComponent(true)}
                    className="underline">Login</button></span>
            </p>

        </form>
        // </section>
    );
};

export default Register;