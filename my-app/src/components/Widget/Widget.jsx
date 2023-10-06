import React, { useState } from 'react'
import "antd/dist/reset.css";
import { Button, Drawer } from 'antd';
import WidgetForm from './components/WidgetForm/WidgetForm';

export default function Widget({
  dataSource
}) {
  const [isDrawerVisible,setIsDrawerVisible] =useState(false)
  const [isCreate,setIsCreate] =useState(false)
  const showerDrawer=()=>{
    setIsDrawerVisible(true)
  }
  const closeDrawer=()=>{
    setIsDrawerVisible(false)
  }
  return (
    <>
  <Drawer
  type="Create"
  title="Drawer Title"
  placement='right'
  onClose={closeDrawer}
  visible={isDrawerVisible}
  >
    {
      isDrawerVisible && 
      <WidgetForm
      isVisible={showerDrawer}
      isCreate={isCreate}
      dataSource={dataSource}
      
      />
    }
  </Drawer>
  <Button type='primary' onClick={showerDrawer}>Open Drawer</Button>
    </>
  )
}
