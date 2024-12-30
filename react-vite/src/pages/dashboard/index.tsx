import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Form,
  FormProps,
  message,
  Modal,
  Input,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ICategory {
  id: number;
  name: string;
}

type FieldType = {
  name: string;
  id: number;
};

export function CategoriesPage2() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [resFresh, setResFresh] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();

  const [formUpdate] = Form.useForm();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleModalEditOk = () => {
    formUpdate.submit();
  };

  const handleModalEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const onFinishUpdate: FormProps<FieldType>["onFinish"] = async (values) => {
    const { id, ...payload } = values;
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (data) {
      setResFresh(Math.random());
      messageApi.open({
        type: "success",
        content: "Update category success",
      });
      setIsModalEditOpen(false);
    }
  };

  const onFinishFailedUpdate: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "ID", // Tiêu đề cột
      dataIndex: "id", // Key để lấy dữ liệu từ danh sách
      key: "id", // Key duy nhất
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action", // Cột chứa các nút hành động
      key: "action",
      render: (_, record: ICategory) => (
        <Space size="middle">
          <Button
            onClick={() => {
              formUpdate.setFieldsValue(record); // Đổ dữ liệu vào form chỉnh sửa
              setIsModalEditOpen(true); // Mở modal
            }}
            type="dashed"
          >
            <EditOutlined /> Edit
          </Button>
          <Button
            onClick={async () => {
              console.log("Xóa ID:", record.id);
              // Xóa dữ liệu từ products
              const response = await fetch(
                `https://api.escuelajs.co/api/v1/categories/${record.id}`,
                {
                  method: "DELETE",
                }
              );
              const data = await response.json();
              if (data) {
                // Làm tươi danh sách với random number
                setResFresh(Math.random());

                // Tạo thông báo
                // messageApi.open({
                //   type: "success",
                //   content: "Delete product success",
                // });
                if (response.ok) {
                  setResFresh(Math.random());
                  messageApi.open({
                    type: "success",
                    content: "Delete category success",
                  });
                } else {
                  console.error("Delete failed with status:", response.status);
                }
              }
            }}
            danger
            type="dashed"
          >
            <DeleteOutlined /> Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, [resFresh]);

  return (
    <main>
      {contextHolder}
      <Table columns={columns} dataSource={categories} rowKey="id" />
      <Modal
        title="Edit Category"
        open={isModalEditOpen}
        onOk={handleModalEditOk}
        onCancel={handleModalEditCancel}
      >
        <Form
          name="formUpdate"
          form={formUpdate}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishUpdate}
          onFinishFailed={onFinishFailedUpdate}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="id" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      ;
    </main>
  );
}
