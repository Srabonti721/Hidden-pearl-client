import Banner from "./Banner";
import OurStory from "./OurStory";
import RestaurantStats from "./RestaurantStats";
import TopFoods from "./TopFoods";
import axios from "axios";

const foodsPromice = axios.get("http://localhost:3000/foods").then((response) => response.data);

const Home = () => {
    return (
        <div>
            <Banner />
            <TopFoods foodsPromice={foodsPromice} />
            <OurStory/>
            <RestaurantStats/>
        </div>
    );
};

export default Home;
