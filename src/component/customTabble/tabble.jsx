"use client"
import { useState, useEffect } from 'react';
import { Table, Tag, Input } from 'antd';
import callApi from '@/callApi/callApi';
import { useSelector } from 'react-redux';

const columns = [
  {
    title: 'Tên khu bán',
    dataIndex: 'name',
    width: "20%",
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    width: '40%',
  },
  {
    title: 'Giá thuê',
    dataIndex: 'priceCost',
    width: "20%",
  },
  {
    title: "Trạng thái thuê",
    dataIndex: 'status',
  }
];

const TableC = ({ listArea }) => {
  const [listA, setListA] = useState(listArea ? [...listArea] : []);
  const [size, setSize] = useState(10);
  const [data, setData] = useState(null);
  const [dataUpdate , setDataUpdate] = useState([]);
  const [dataInput, setDataInput] = useState({
    q: "",
    limit: 100,
    page: 1,
  });

  useEffect(() => {
    setListA([...listArea]);
    setDataUpdate(listArea.map((area)=> area._id));
  }, [listArea]);

  function handleChange(page, size) {
    setSize(size);
  }

  function handleSearch(e) {
    setDataInput({ ...dataInput, q: e.target.value });
  }

  async function getDataInput() {
    setData(null);
    const datag = await callApi("GET", "markets/search", dataInput);
    setData(datag.data.map((item, index) => {
      const isOwnedByUser = listA ? listA.some((areac) => areac.name === item.name) : false;
      return {
        key: index,
        _id : item._id,
        name: item.name,
        description: item.description,
        priceCost: item.priceCost + " vnd / ngày",
        status1: item.status,
        status: item.status ? <Tag color="green">chưa được thuê</Tag> :
          isOwnedByUser ? <Tag color="cyan">đã được thuê bởi bạn</Tag> : <Tag color="red">đã được thuê</Tag>
      };
    }));
  }

  useEffect(() => {
    getDataInput();
  }, [dataInput, listA]);


  async function updateArea(areaCost){
      callApi("PUT","user/updateArea",{areaCost})
      window.location.reload();
  }

  const rowSelection = {
    
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        let a = [...(selectedRows.map((row, i) =>(row._id)))].concat(listArea.map((area)=> area._id));
        updateArea(a);
      },
      getCheckboxProps: (record) => ( 
        {
        disabled: record.status1 === false,
        name: record.name,
      }
    ),
    
  }

  

  console.log(dataUpdate)
  console.log(useSelector((state)=> state.auth.email),"=======")
  
  return (
    <div>
      <Input
        style={{ width: "400px", marginBottom: "10px" }}
        placeholder="Search any thing here ..."
        onChange={handleSearch}
      />
      <Table
        rowSelection={ useSelector((state)=> state.auth.email) ? rowSelection : null }
        loading={data ? false : true}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: size,
          onChange: handleChange
        }}
        scroll={{
          y: 240,
        }}
      />
    </div>
  );
};

export default TableC;
