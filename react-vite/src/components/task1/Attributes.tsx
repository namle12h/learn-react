type TAttr = {
  label: string;
  active?: boolean;
};
function AttrItem({ label, active = false }: TAttr) {
  let finaleClass = "border py-1 px-2";
  if (active) {
    finaleClass += " text-white bg-gray-500 border-black border-2";
  }
  return <span className={finaleClass}>{label}</span>;
}

function Attributes() {
  return (
    <div className="attrs mb-5 space-x-4 ">
      Màu sắc
      <AttrItem active={true} label="Đen" />
      <AttrItem label="Hồng" />
      <AttrItem label="Xanh" />
    </div>
  );
}

export default Attributes;
