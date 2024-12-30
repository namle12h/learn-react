import { ShieldCheck, SquareCheck, Undo2 } from "lucide-react"; // Sửa lại tên import (chữ 'S' viết hoa)

type Tpolicy = {
  title: string;
  content: string;
  icon?: React.ReactNode; // Thêm prop icon vào Tpolicy để nhận icon
};

function PlcItem({ title, content, icon }: Tpolicy) {
  const finaleClass = "flex items-center"; // Đảm bảo các phần tử hiển thị cùng dòng

  return (
    <span className={finaleClass}>
      {/* Hiển thị icon nếu có */}
      {icon && (
        <span className="mr-2 p-1 border border-green-500 bg-gray rounded-full">
          {icon}
        </span>
      )}
      <span className="font-bold">{title}</span>
      <span className="text-gray-600 ml-2">{content}</span>
    </span>
  );
}

function PolicyInfo() {
  return (
    <div className="attrs ">
      {/* Truyền icon vào PlcItem */}
      <PlcItem
        icon={<ShieldCheck size={16} />} // Sử dụng icon ShieldCheck
        title="Bộ sản phẩm gồm:"
        content="Hộp, Sách hướng dẫn, Cáp, Cây lấy sim"
      />
      <PlcItem
        icon={<SquareCheck size={16} />}
        title="Bảo Hành:"
        content="Chính hãng 12 tháng"
      />
      <PlcItem
        icon={<Undo2 size={16} />}
        title="Đổi trả:"
        content="Hư gì đổi náy 12 tháng"
      />
    </div>
  );
}

export default PolicyInfo;
