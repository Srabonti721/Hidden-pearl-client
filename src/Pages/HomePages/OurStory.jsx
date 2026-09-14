import { GiForkKnifeSpoon } from "react-icons/gi";
import { PiChefHatLight } from "react-icons/pi";
import { TbGlass } from "react-icons/tb";

const OurStory = () => {
    return (
        <section className="py-20 bg-[#fffdf8]">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
                {/* Images */}
                <div className="relative min-h-[500px] mr-10">
                    {/* Food Image */}
                    <img
                        src="https://i.ibb.co.com/fdf61JSF/Fast-Food.jpg"
                        alt="Delicious food"
                        className="absolute left-0 top-10 h-[380px] w-[65%] rounded-lg object-cover shadow-lg"
                    />

                    {/* Restaurant Image */}
                    <img
                        src="https://i.ibb.co.com/7JM1tShg/chef.jpg"
                        alt="Restaurant"
                        className="absolute -right-10 top-28 h-[380px] w-[60%] rounded-lg object-cover shadow-xl"
                    />
                </div>

                {/* Text */}
                <div>
                    <h2 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
                        Discover Our{" "}
                        <span className="text-orange-400">Story</span>
                    </h2>

                    <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                        A Passion for Great Food
                    </h3>

                    <p className="mb-5 leading-7 text-gray-600">
                        What started as a simple love for good food has grown
                        into a place where delicious flavors and warm
                        hospitality come together. We believe that every meal
                        should be fresh, flavorful, and made with care.
                    </p>

                    <div className="mb-7 flex gap-8">
                        <div className="flex gap-2 items-center">
                            <TbGlass style={{ color: "orange" }} size={50} />
                            <div>
                                <h4 className="font-semibold text-3xl">94</h4>
                                <p className="text-xl">
                                    Beverages
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <GiForkKnifeSpoon
                                style={{ color: "orange" }}
                                size={50}
                            />

                            <div>
                                <h4 className="font-semibold text-3xl">206</h4>
                                <p className="text-xl">
                                    Food Items
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <PiChefHatLight    style={{ color: "orange" }}
                                size={50} />
                            <div>
                                <h4 className="font-semibold text-3xl">74</h4>
                                <p className="text-xl">Love</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
