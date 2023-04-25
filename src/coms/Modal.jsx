import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { setModalVisible } from "../store/app";

const RegistModal = ({
  textColor,
  bgColor,
  title,
  setModalVisible,
  modalVisible,
  children,
}) => {
  const handleCancel = () => setModalVisible(false);
  const handleOk = () => {

    setModalVisible(false);
  };
  return (
    <Modal
      style={{ backgroundColor: bgColor, color: textColor,padding:0}}
      title={title}
      open={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      bodyStyle={{ margin: "1.1rem 0" }}
      okText="确认"
      cancelText="取消"
      footer={null}
    >
      {children}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalVisible: state.app.modalVisible,
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
});

const mapDispatchToProps = {
  setModalVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistModal);
