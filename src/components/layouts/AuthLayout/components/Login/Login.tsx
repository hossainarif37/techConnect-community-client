"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputWithLabel from "@/components/common/Input/InputWithLabel";
import { useLoginMutation } from "@/redux/api/endpoints/users/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { setUser } from "@/redux/slices/user/userSlice";
import Cookies from "js-cookie";

interface IFormInput {
    email: string;
    password: string;
}


const Login = ({ isLoginComponent, setIsLoginComponent }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const router = useRouter();
    const [login, { isLoading, isError, error }] = useLoginMutation();

    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: IRootState) => state.userSlice);


    //* hanle login function
    const handleLogin = (data: IFormInput) => {
        const loginResponse = login({ email: data.email, password: data.password }).unwrap();


        toast.promise(loginResponse, {
            loading: 'Loading',
            success: ({ user, message, token }) => {
                dispatch(setUser({ user: user, isAuthenticated: true }));
                Cookies.set('authToken', token, { expires: 30 });
                return message;

            },
            error: ({ data }) => {
                return data?.message || 'Login failed';
            },
        });
    }


    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
        >

            <div className="flex flex-col gap-y-7 mb-5">
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
                <button
                    type="submit"
                    className="btn bg-primary text-white"
                >
                    Login
                </button>

            </div>
            {/*//* Navigate to Register page */}
            <p className="text-center"><span>Don't have an account? <button
                type="button"
                onClick={() => setIsLoginComponent(false)}
                className="text-primary underline">Create an account</button></span></p>
        </form>
    );
};

export default Login;