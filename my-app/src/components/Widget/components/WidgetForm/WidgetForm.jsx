import { Col, Form, Input, Row } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
export default function WidgetForm({
}) {
    const [schema,setSchema] =useState(0)
    const validationSchema={
        widget_name: Yup.string().required("Required"),
        widget_type: Yup.string().required("Required"),
        widget_text: Yup.string().when("widget_type",{
            is:(val)=>val === "text",
            then:Yup.string().required("Required")
        }),
        data_source: Yup.string().when("widget_type",{
            is:(val)=>val !== "text",
            then:Yup.array().min(1,`Required`)
        }),
    }
    const initialValues={
        widget_name:"",
        widget_text:"",
        widget_type:"",
        data_source:[]
    }
    const validationSchemaStandard =Yup.object(schema)
  return (
    <>
    <Formik
    id="formik"
    validationSchema={validationSchemaStandard}
    initialValues={initialValues}
    onSubmit={(values)=>{
        // onHandleSubmit(values)
    }}
    >
        {({
            values,
        })}
        <Form disabled>
            <div>
                <label>Widget Type <span>*</span></label>
            </div>
            <Row gutter={[8,0]}>
                <Col>
            <Input
             placeholder='Widget Text'
             label="widget Text"
             name='widget_text'
             
             />
             </Col>
             </Row>
        </Form>
        
    </Formik>
    
    </>
  )
}
