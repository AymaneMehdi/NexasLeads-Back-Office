import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure, addBlog, updateBlog, deleteBlog } from '../Redux/actions/Blogs';
import { getBlogs, updateBlog as updateBlogAPI, deleteBlog as deleteBlogAPI, addBlog as addBlogAPI } from '../API/Blogs';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BlogTable = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 4 });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { blogs } = useSelector((state) => state.Blogs ? state.Blogs : { blogs: [] });

  useEffect(() => {
    dispatch(fetchBlogsRequest());
    getBlogs()
      .then((blogs) => {
        dispatch(fetchBlogsSuccess(blogs));
      })
      .catch((error) => {
        dispatch(fetchBlogsFailure(error));
      });
  }, [dispatch]);

  const handleEdit = (record) => {
    const contentState = convertFromRaw(JSON.parse(record.text));
    const editorState = EditorState.createWithContent(contentState);
  
    setEditedBlog(record);
    setEditorContent(record.text);
    setEditorState(editorState);
    setEditModalVisible(true);
    form.setFieldsValue(record);
    setImageUrl(record.image);
  };

  const handleCancel = () => {
    form.resetFields();
    setAddModalVisible(false);
    setEditModalVisible(false);
    setEditedBlog(null);
    setImageUrl('');
    setEditorContent('');
  };

  const handleAddBlog = async () => {
    try {
      const values = await form.validateFields();
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
  
      const blogData = {
        ...values,
        text: rawContent,
        url: imageUrl
      };
      await addBlogAPI(blogData);
      dispatch(addBlog(blogData));
      form.resetFields();
      setAddModalVisible(false);
      setImageUrl('');
      setEditorContent('');
      message.success('Blog added successfully');
    } catch (error) {
      console.error('Error adding blog:', error);
      message.error('Error adding blog. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedBlogData = {
        ...editedBlog,
        ...values,
        text: editorContent
      };
      if (imageUrl) {
        updatedBlogData.image = imageUrl;
      }
      await updateBlogAPI(editedBlog._id, updatedBlogData);
      dispatch(updateBlog(editedBlog._id, updatedBlogData));
      form.resetFields();
      setEditModalVisible(false);
      setEditorContent('');
      message.success('Blog updated successfully');
    } catch (error) {
      console.error('Error updating blog:', error);
      message.error('Error updating blog. Please try again.');
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlogAPI(blogId);
      dispatch(deleteBlog(blogId));
      message.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      message.error('Error deleting blog. Please try again.');
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const url = info.file.response.secure_url;
      setImageUrl(url);
    }
  };

  const uploadProps = {
    action: '',
    data: { upload_preset: 'duqax7wj' },
    onChange: handleChange,
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button size="small" style={{ width: 90 }} onClick={() => handleReset(clearFilters)}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const buttonStyle = {
    backgroundColor: '#e24545',
    borderColor: '#e24545',
    color: '#ffffff',
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      align: 'center',
      ...getColumnSearchProps('author'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url) => <img src={url} alt="Media" style={{ display: 'block', margin: '0 auto', maxWidth: '100px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)} style={{ color: '#e24545', fontSize: '1.5em' }}>
            <EditOutlined />
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)} style={{ color: '#e24545', fontSize: '1.5em' }}>
            <DeleteOutlined />
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <p style={{ color: '#e24545', fontWeight: 'bold', marginRight: 'auto', marginLeft: '20px', fontSize: '1.2em' }}>Blogs</p>
        <Button
          type="primary"
          onClick={() => setAddModalVisible(true)}
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#e24545', color: '#ffffff' }}
        >
          Add Blog
        </Button>
      </div>
      <Modal
        title="Add Blog"
        visible={addModalVisible}
        onOk={handleAddBlog}
        onCancel={handleCancel}
        okButtonProps={{ style: buttonStyle }}
        cancelButtonProps={{ style: buttonStyle }}
      >
        <Form form={form} layout="vertical">

          <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Blog : </p>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please enter author' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Content :</p>
        <Form.Item>



        <Form.Item name="text" label="Content">
        <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'link', 'embedded'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          blockType: {
            options: ['Normal', 'Blockquote', 'Code'],
          },
          link: { inDropdown: true },
          embedded: { inDropdown: true },
        }}
        placeholder="Entrez le contenu du blog..."
      />
          </Form.Item>
        </Form.Item>



          <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>keywords : </p>
          <Form.Item name="keyword1" label="Keyword1" rules={[{ required: true, message: 'Please enter Keyword1' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword2" label="Keyword2" rules={[{ required: true, message: 'Please enter Keyword2' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword3" label="Keyword3" rules={[{ required: true, message: 'Please enter Keyword3' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword4" label="Keyword4" rules={[{ required: true, message: 'Please enter Keyword4' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword5" label="Keyword5" rules={[{ required: true, message: 'Please enter Keyword5' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword6" label="Keyword6" rules={[{ required: true, message: 'Please enter Keyword6' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword7" label="Keyword7" rules={[{ required: true, message: 'Please enter Keyword7' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword8" label="Keyword8" rules={[{ required: true, message: 'Please enter Keyword8' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword9" label="Keyword9" rules={[{ required: true, message: 'Please enter Keyword9' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="keyword10" label="Keyword10" rules={[{ required: true, message: 'Please enter Keyword10' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>

           

          <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Other SEO Parames : </p>
          <Form.Item name="Metatitle" label="Metatitle" rules={[{ required: true, message: 'Please enter Metatitle' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
            <Input.TextArea style={{ borderColor: '#e24545', color: '#e24545' }} rows={4} />
          </Form.Item>


          <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Image : </p>
          <Form.Item name="alt" label="Alt" rules={[{ required: true, message: 'Please enter Alt' }]}>
            <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
          </Form.Item>
          
            <Form.Item name="media" label="Image">
            <Upload id="media-upload" {...uploadProps}>
              <Button style={{ backgroundColor: '#e24545', borderColor: '#e24545', color: '#ffffff' }}>Click to Upload</Button>
            </Upload>
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="User" style={{ display: 'block', margin: '10px auto', maxWidth: '200px' }} />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Blog"
        visible={editModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okButtonProps={{ style: buttonStyle }}
        cancelButtonProps={{ style: buttonStyle }}
      >
      <Form form={form} layout="vertical" initialValues={editedBlog}>

      <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Blog : </p>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please enter author' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Content :</p>
    <Form.Item>
    <Form.Item
        name="text"
        label="Content"
        rules={[{ required: true, message: 'Please input the blog content!' }]}
      >
      <Form.Item name="text" label="Content">
      <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: ['inline', 'blockType', 'link', 'embedded'],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        },
        blockType: {
          options: ['Normal', 'Blockquote', 'Code'],
        },
        link: { inDropdown: true },
        embedded: { inDropdown: true },
      }}
      placeholder="Entrez le contenu du blog..."
    />
          </Form.Item>
      </Form.Item>
    </Form.Item>



      <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>keywords : </p>
      <Form.Item name="keyword1" label="Keyword1" rules={[{ required: true, message: 'Please enter Keyword1' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword2" label="Keyword2" rules={[{ required: true, message: 'Please enter Keyword2' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword3" label="Keyword3" rules={[{ required: true, message: 'Please enter Keyword3' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword4" label="Keyword4" rules={[{ required: true, message: 'Please enter Keyword4' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword5" label="Keyword5" rules={[{ required: true, message: 'Please enter Keyword5' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword6" label="Keyword6" rules={[{ required: true, message: 'Please enter Keyword6' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword7" label="Keyword7" rules={[{ required: true, message: 'Please enter Keyword7' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword8" label="Keyword8" rules={[{ required: true, message: 'Please enter Keyword8' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword9" label="Keyword9" rules={[{ required: true, message: 'Please enter Keyword9' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="keyword10" label="Keyword10" rules={[{ required: true, message: 'Please enter Keyword10' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>

       

      <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Other SEO Parames : </p>
      <Form.Item name="Metatitle" label="Metatitle" rules={[{ required: true, message: 'Please enter Metatitle' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
        <Input.TextArea style={{ borderColor: '#e24545', color: '#e24545' }} rows={4} />
      </Form.Item>


      <p className='font-semibold text-lg text-[#e24545] mb-5 mt-5'>Image : </p>
      <Form.Item name="alt" label="Alt" rules={[{ required: true, message: 'Please enter Alt' }]}>
        <Input style={{ borderColor: '#e24545', color: '#e24545' }} />
      </Form.Item>
      
      <Form.Item name="media" label="Image">
      <Upload {...uploadProps}>
        <Button style={{ backgroundColor: '#e24545', borderColor: '#e24545', color: '#ffffff' }}>Click to Upload</Button>
      </Upload>
      {editedBlog && editedBlog.media && (
        <div>
          <img src={editedBlog.media} alt="User" style={{ display: 'block', margin: '10px auto', maxWidth: '200px' }} />
        </div>
      )}
    </Form.Item>
    </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={blogs}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
        rowKey="_id"
      />
    </div>
  );
};

export default BlogTable;
