import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import Modal from "../../../Modal";

import NoAvatar from "../../../assets/images/png/9.1 no-avatar.png";
import ".//ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <div className="list-users">
      <div className="list-users-header">
        <div className="list-users-header-switch">
          <Switch
            defaultChecked
            onChange={() => {
              setViewUsersActive(!viewUsersActive);
            }}
          />
          <span>
            {viewUsersActive ? " Usuarios Activos" : " Usuarios Inactivos"}
          </span>
        </div>

        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario...
        </Button>
      </div>
      {/*  */}

      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando Usuario: ${user.name} ${user.lastName}`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando el usuario",
      content: `Estas seguro que deseas eliminar a ${user.email}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => editUser(user)}
          icon={<EditOutlined />}
        />,

        <Button
          type="danger"
          onClick={desactivateUser}
          icon={<StopOutlined />}
          title="Desactivar Ususario"
        />,
        <Button
          type="danger"
          onClick={showDeleteConfirm}
          icon={<DeleteOutlined />}
          tile="Eliminar Usuario"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
            ${user.name ? user.name : "No existe nombre"}
            ${user.lastName ? user.lastName : "No existe Apellido"}
        
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const token = getAccessTokenApi();
    activateUserApi(token, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando el usuario",
      content: `Estas seguro que deseas eliminar a ${user.email}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={activateUser}
          icon={<CheckOutlined />}
        />,

        <Button
          type="danger"
          onClick={showDeleteConfirm}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : "No existe nombre"}
                ${user.lastName ? user.lastName : "No existe Apellido"}
                
                `}
        description={user.email}
      />
    </List.Item>
  );
}
