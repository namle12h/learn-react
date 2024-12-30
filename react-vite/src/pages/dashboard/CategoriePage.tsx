import { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  message,
  Modal,
  Form,
  FormProps,
  Input,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ICategory {
  id: number;
  name: string;
}

type FieldType = {
  name: string;
  id: number;
};

export function CategoriesPage() {
  //Bước 1: Khai báo state
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [resFresh, setResFresh] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();

  //Bước 2: Lấy dữ liệu từ API
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

  //------EDIT CATEGORY ------///
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

  //------ADD CATEGORY ------///
  const [formAdd] = Form.useForm();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleModalAddOk = () => {
    formAdd.submit();
  };

  const handleModalAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const onFinishAdd: FormProps<FieldType>["onFinish"] = async (values) => {
    const payload = { name: values.name };
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.status === 201) {
      setResFresh(Math.random());
      messageApi.open({
        type: "success",
        content: "Add category success",
      });
      setIsModalAddOpen(false);
    }
  };

  const onFinishFailedAdd: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: ICategory) => (
        <Space size="middle">
          <Button
            onClick={() => {
              formUpdate.setFieldsValue(record);
              setIsModalEditOpen(true);
            }}
            type="dashed"
          >
            <EditOutlined /> Edit
          </Button>
          <Button
            onClick={async () => {
              const response = await fetch(
                `https://api.escuelajs.co/api/v1/categories/${record.id}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                setResFresh(Math.random());
                messageApi.open({
                  type: "success",
                  content: "Delete category success",
                });
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

  return (
    <main>
      {contextHolder}
      <div className="flex justify-between items-center">
        <h1>Categories Page</h1>
        <div className="actions">
          <Button
            onClick={() => {
              setIsModalAddOpen(true);
            }}
            type="primary"
          >
            Add Category
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="id" />

      {/* Modal Edit */}
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

      {/* Modal Add */}
      <Modal
        title="Add Category"
        open={isModalAddOpen}
        onOk={handleModalAddOk}
        onCancel={handleModalAddCancel}
      >
        <Form
          name="formAdd"
          form={formAdd}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
