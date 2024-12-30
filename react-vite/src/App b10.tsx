import "./App.css";
import Attributes from "./components/task1/Attributes";
import PolicyInfo from "./components/task2/Policy";
import Button from "./components/task3/Button";
import Policy from "./components/Policy";
import { ShoppingCart, Phone } from "lucide-react";
import ProductItem from "./components/ProductItem";
import ProcessBar from "./components/ProcessBar";
import Box from "./Box";
import SimpleCarousel from "./SimpleCarousel";
import Greet from "./components/Greet/Greet";
import MyCV from "./components/MyCV";
import { useState } from "react";
import ReactHookFormExample from "./components/ReadHookFormExample";

const TrafficLight = ({ className }: { className?: string }) => {
  return <div className={`w-20 h-20 rounded-full ${className}`}></div>;
};

function App() {
  const [todos, setTodos] = useState<string[]>(["Giặt đồ", "Nấu cơm"]);
  const products = [
    {
      thumbnail:
        "https://dtntbinhlong.edu.vn/wp-content/uploads/2024/10/anh-gai-xinh-184K69e.jpg",
      promoPrice: 6000,
      price: 550,
      name: "ảnh girl xinh",
    },
    {
      thumbnail:
        "https://dtntbinhlong.edu.vn/wp-content/uploads/2024/10/anh-gai-xinh-184K69e.jpg",
      promoPrice: 7000,
      name: "ảnh girl đẹp",
      price: 550,
    },
    {
      thumbnail:
        "https://dtntbinhlong.edu.vn/wp-content/uploads/2024/10/anh-gai-xinh-184K69e.jpg",
      promoPrice: 6500,
      name: "ảnh girl dễ thương",
      price: 600,
    },
    {
      thumbnail:
        "https://dtntbinhlong.edu.vn/wp-content/uploads/2024/10/anh-gai-xinh-184K69e.jpg",
      promoPrice: 9500,
      name: "ảnh girl dễ thương",
      price: 900,
    },
  ];

  const [color, setColor] = useState<string>("green");

  let finalClass = "bg-green-500";
  if (color === "red") {
    finalClass = "bg-red-500";
  } else if (color === "yellow") {
    finalClass = "bg-yellow-500";
  }

  return (
    <main className=" container mx-auto">
      <h1>
        Task1 <Attributes />
      </h1>
      <h1>
        Task2 <PolicyInfo />
      </h1>
      <h1>Task3</h1>
      <div className="flex mb-5 space-x-4 ">
        <Button
          icon={<ShoppingCart size={16} />}
          type="primary"
          label="Thêm Vào giỏ hàng"
        />
        <Button icon={<Phone size={16} />} type="ghost" label="Gọi Tư Vấn" />
      </div>
      <Policy />

      {/* <ProductItem
        thumbnail="https://dtntbinhlong.edu.vn/wp-content/uploads/2024/10/anh-gai-xinh-184K69e.jpg"
        promoPrice={6000}
        name="ảnh girl xinh"
        price={500}
      /> */}

      <div className="flex ">
        {products.map((p) => {
          return (
            <ProductItem
              thumbnail={p.thumbnail}
              name={p.name}
              price={p.price}
              promoPrice={p.promoPrice}
            />
          );
        })}
      </div>

      <ProcessBar
        label="BANDWIDTH"
        bgLabel="bg-red-700"
        percent={20}
        bgPercent="bg-red-600"
      />
      <ProcessBar
        label="STORSGE"
        bgLabel="bg-sky-700"
        percent={50}
        bgPercent="bg-sky-600"
      />
      <Box title="Tin tức">
        <div className="article-list"> DS tin tức</div>
      </Box>
      <MyCV />
      <div>
        <TrafficLight className={finalClass} />
        <button
          onClick={() => {
            setColor("green");
          }}
        >
          {" "}
          xanh
        </button>
        <button
          onClick={() => {
            setColor("red");
          }}
        >
          {" "}
          đỏ
        </button>
        <button
          onClick={() => {
            setColor("yellow");
          }}
        >
          {" "}
          vàng
        </button>
      </div>

      <div>
        <ul className="list-disc ms-10">
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
        <button onClick={() => setTodos([...todos, "Thêm mới"])}>
          Thêm mới
        </button>
      </div>

      <SimpleCarousel />
      <ReactHookFormExample />
      <Greet name="Aptech" />
    </main>
  );
}

export default App;
