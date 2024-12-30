import { IButton } from "./../types/button";

function Button({ icon, label, type }: IButton) {
  let finalStyle = " ";
  if (type === "outline") {
    finalStyle = "bg-white";
  } else if (type === "primary") {
    finalStyle =
      "bg-orange-600 text-white border-orange-600 hover:bg-orange-700";
  } else if (type === "ghost") {
    finalStyle =
      "bg-transparent border-1 border-white bg-gray-400 text-gray-600 hover:bg-gray-500";
  }

  return (
    <>
      <button className={` items-center gap-x-2 py-2 px-2 ${finalStyle}`}>
        {icon && <span className="items-center  ">{icon}</span>}
        {label}
      </button>
    </>
  );
}

export default Button;
