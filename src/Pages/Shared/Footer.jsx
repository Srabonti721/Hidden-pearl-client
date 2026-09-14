import { use } from "react";
import {} from "react-icons/bs";
import { FaFacebookF, FaGreaterThan } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const Footer = ({ foodPromice }) => {
    const foods = use(foodPromice);
    const purchasefood = [...foods]
        .sort((x, y) => y.purchaseCount - x.purchaseCount)
        .slice(0, 2);
    console.log(purchasefood);

    return (
        <>
            <div
                className="hero h-96 mt-10"
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/zVwMtMHN/footer.jpg')",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="footer sm:footer-horizontal text-neutral-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-10">
                    <nav>
                        <h6 className="text-white text-2xl border-b-4 border-orange-400">About Us</h6>
                       
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
                    <nav>
                        <h6 className="text-white text-2xl border-b-4 border-orange-400">Food Menu</h6>
                        <div className="grid grid-cols-2 gap-2">
                            {foods.map((food, index) => (
                                <>
                                    <a
                                        key={index}
                                        className="hover:text-orange-400 flex items-center gap-4"
                                    >
                                        <FaGreaterThan /> {food.name}
                                    </a>
                                </>
                            ))}
                        </div>
                    </nav>
                    <nav>
                        <h6 className=" text-white text-2xl border-b-4 border-orange-400">Latest Posts</h6>
                        {purchasefood.map((food, index) => (
                            <>
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        className="w-30 h-20 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                        src={food.image}
                                        alt=""
                                    />
                                    <div className="hover:text-orange-400">
                                        <h2>{food.name}</h2>
                                        <p>৳ {food.price}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </nav>
                </div>
            </div>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
                <aside className="grid-flow-col items-center">
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved
                    </p>
                </aside>
                <nav className="grid-flow-col gap-10 md:place-self-center md:justify-self-end">
                    <a className="hover:text-orange-400">Terms & Conditions</a>
                    <a className="hover:text-orange-400">Refund Policy</a>
                    <a className="hover:text-orange-400">Support</a>
                </nav>
            </footer>
        </>
    );
};

export default Footer;
