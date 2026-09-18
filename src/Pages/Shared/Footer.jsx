import {} from "react";
import { FaFacebookF } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const Footer = () => {
    return (
        <>
            <div
                className="hero mt-10"
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/zVwMtMHN/footer.jpg')",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="footer sm:footer-horizontal text-neutral-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-10">
                    <nav>
                        <h6 className="text-white text-2xl border-b-4 border-orange-400">
                            About Us
                        </h6>

                        <p>
                            Energistically repurpose client-based odels rather
                            than magnetic sources. Intrinsicly bcks-and-mortar
                            ideas before.
                        </p>
                        <div className="flex gap-2">
                            <div className="border border-black p-2 rounded-full hover:bg-orange-400">
                                <a href="" target="_blank">
                                    <FaFacebookF size={20} />
                                </a>
                            </div>
                            <div className="border border-black p-2 rounded-full hover:bg-orange-400">
                                <a
                                    href="https://www.youtube.com/channel/UCMkuZW-TroSQvp5ZHt0VHmA"
                                    target="_blank"
                                >
                                    <TbBrandYoutubeFilled size={20} />
                                </a>
                            </div>
                            <div className="border border-black p-2 rounded-full hover:bg-orange-400">
                                <a
                                    href="https://github.com/Srabonti721"
                                    target="_blank"
                                >
                                    <PiGithubLogoFill size={20} />
                                </a>
                            </div>
                        </div>
                    </nav>
                    <nav></nav>
                </div>
            </div>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content pt-10 items-center p-4">
                <aside className="grid-flow-col items-center">
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved
                    </p>
                </aside>
                <nav className="grid-flow-col  gap-4 lg:gap-10 md:place-self-center md:justify-self-end">
                    <a className="hover:text-orange-400">Terms & Conditions</a>
                    <a className="hover:text-orange-400">Refund Policy</a>
                    <a className="hover:text-orange-400">Support</a>
                </nav>
            </footer>
        </>
    );
};

export default Footer;
