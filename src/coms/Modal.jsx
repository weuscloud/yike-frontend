import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
const RegistModal = ({
  textColor,
  bgColor,
  title,
  children,
  visible,
  visibleChange
}) => {
  const handleCancel = () => setModalVisible(false);
  const handleOk = () => {
    setModalVisible(false);
  };
  const [modalVisible,setModalVisible]=useState(visible);

  useEffect(()=>{
    setModalVisible(visible)
  },[visible])
  useEffect(()=>{
    if(typeof visibleChange==='function')
    visibleChange(modalVisible)
  },[modalVisible])
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
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistModal);
