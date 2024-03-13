import Link from "next/link";
import LoginRegisterTab from "./components/LoginRegisterTab";
import { BiArrowBack } from "react-icons/bi";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="container">
            <Link className="flex items-center absolute top-10 hover:underline font-semibold" href={'/'}>
                <BiArrowBack className='mr-2' /> Back To Home
            </Link>

            <div className="my-28 md:my-40">

                <div className="md:w-[450px] mx-auto rounded md:shadow-lg px-5 md:p-10">
                    <LoginRegisterTab />
                    {children}
                </div>

            </div>
        </section>

    );
}
