import { useEffect, useRef, useState } from "react";

const RestaurantStats = () => {
  const sectionRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-cover bg-center py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
      }}
    >
      <div className="bg-black/60 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center text-white md:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold">
              {startCounting ? <Counter end={10000} /> : 0}+
            </h2>
            <p className="mt-2">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              {startCounting ? <Counter end={500} /> : 0}+
            </h2>
            <p className="mt-2">Food Items</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              {startCounting ? <Counter end={50} /> : 0}+
            </h2>
            <p className="mt-2">Expert Chefs</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              {startCounting ? <Counter end={15} /> : 0}+
            </h2>
            <p className="mt-2">Years Experience</p>
          </div>

        </div>
      </div>
    </section>
  );
};
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(end / 50);

      if (current >= end) {
        current = end;
        clearInterval(timer);
      }

      setCount(current);
    }, 40);

    return () => clearInterval(timer);
  }, [end]);

  return count.toLocaleString();
};


export default RestaurantStats;