import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { toast } from "react-toastify";
import "./PasswordModal.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePassword } from "../../Api/AuthRequest";
import { useEffect } from "react";
import { message } from "antd";

function PasswordModal({ passwordOpen, setPasswordOpen, data }) {
  const theme = useMantineTheme;
  const [formData, setFormData] = useState("");
  const params = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = params.id;
    await updatePassword(id, formData)
      .then((response) => {
        if(response.status === 200)message.success("Password successfully updated")
        setPasswordOpen(false)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          message.error("Old password is incorrect");
        }
      });
  };
  return (
    <Modal
      //   overlayColor={
      //     theme.colorScheme === "dark"
      //       ? theme.colors.dark[15]
      //       : theme.colors.gray[10]
      //   }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55"
      opened={passwordOpen}
      onClose={() => setPasswordOpen(false)}
    >
      <form>
        <h3>Change password</h3>
        <div className="formPassword">
          <input
            type="text"
            name="oldpassword"
            placeholder="Old password"
            onChange={handleChange}
          />
          <input
            type="text"
            name="newpassword"
            placeholder="New password"
            onChange={handleChange}
          />
        </div>
        <div className="passUPbutton">
          <button onClick={handleSubmit}>Update</button>
        </div>
      </form>
    </Modal>
  );
}

export default PasswordModal;
