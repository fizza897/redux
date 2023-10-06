import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/reset.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  addData,
  editData,
  deleteData,
  cancelData,
  setEditedUser,
  setSearchQuery,
} from "../../Store/Action/Action";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const UserForm = ({
  dataSource,
  // editingIndex,
  addData,
  editData,
  cancelEdit,
  deleteData,
  cancelData,
  setSearchQuery
}) => {
  const searchQuery = useSelector((state) => state.data.searchQuery);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };
const filteredUsers = dataSource.filter((user) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return fullName.toLowerCase().includes(searchQuery.toLowerCase());
});
  const showModal = (index) => {
    setIsModalVisible(true);
    setEditingIndex(index);
    if (index !== null) {
      setSelectedUserData(dataSource[index]);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUserData(null);
  };

  const handleSave = (values) => {
    setIsModalVisible(false);
    if (editingIndex === null) {
      addData(values);
    } else {
      editData(values, editingIndex);
    }
    setEditingIndex(null)
    setSelectedUserData(null);
  };

  const handleDelete = (index) => {
    deleteData(index);
    setSelectedUserData(null);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => (
        <span>
          <Button type="primary" onClick={() => showModal(index)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(index)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <div style={{ padding: "50px" }}></div>
                <input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleFormOpen}>Search Users</Button>
                </div>
      <Button style={{margin:"24px",textAlign:"center", paddingLeft:"20px" }} type="primary" onClick={() => showModal(null)}>
        Add Users
      </Button>
      <Table dataSource={filteredUsers} columns={columns} />
        <Modal
        title={editingIndex !== null ? "Edit User" : "Add User"}
      
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        >
        <Formik
          initialValues={
            editingIndex !== null
            ? dataSource[editingIndex]
            : {
              firstName: "",
              lastName: "",
              email: "",
            }
          }
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            handleSave(values);
            setSubmitting(false);
          }}
          >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field type="text" name="firstName" as={Input} />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" as={Input} />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" as={Input} />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataSource: state.data?.dataSource,
  editingIndex: state.data?.editingIndex,
  searchQuery: state.data.searchQuery,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addData: (data) => dispatch(addData(data)),
    editData: (data, index) => dispatch(editData(data, index)),
    deleteData: (index) => dispatch(deleteData(index)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
    cancelData: () => dispatch(cancelData()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
