import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

const validateMessages = {
  required: "'${label}' 是必选字段",
  types: {
    url: '请填写有效连接',
  },
};

function CollectionSetting() {
  const dispatch = useDispatch();
  const {
    name = '',
    id = '',
    description = '',
    github = '',
    cover = '',
    topics = [],
  } = useSelector((state) => state.collection.data);

  function onFinish(values) {
    console.log('onFinish values', values);
    dispatch.drawer.setVisible(false);
    dispatch.collection.updateCollectionMeta(values);
    dispatch.collection.save();
  }
  return (
    <div className="collection-setting">
      <Form
        onFinish={onFinish}
        validateMessages={validateMessages}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        fields={[
          { name: 'name', value: name },
          { name: 'id', value: id },
          { name: 'cover', value: cover },
          { name: 'github', value: github },
          { name: 'topics', value: topics },
          { name: 'description', value: description },
        ]}
      >
        <Form.Item
          name="name"
          label="标题"
          rules={[{ required: true, message: '请输入文集标题!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="cover" label="封面" rules={[{ type: 'url' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="github" label="GitHub" rules={[{ type: 'url' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Select mode="tags" placeholder="点击输入文集标签" />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 16, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CollectionSetting;
