import { Table, Button, Modal } from "antd";
import React, { useState } from "react";
import { MachineStart } from "../api/MachineStart";

function MachineTable({ machines }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [pools, setPools] = useState(
    machines.map((machine) => ({
      id: machine.id,
      pool: 0,
      min_price: machine.min_price,
      process_time_sec: machine.process_time_sec,
    }))
  );

  const columns = [
    {
      title: "Machine",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "min_price",
      key: "min_price",
      align: "center",
    },
    {
      title: "Coin pool",
      key: "coin_pool",
      align: "center",
      render: (record) => <PriceButtons record={record} />,
    },
    {
      title: "Total coin",
      key: "total_coin",
      dataIndex: "id",
      align: "center",
      render: (text) => {
        const pool = pools.find((pool) => pool.id === text);
        return <div>{pool.pool}</div>;
      },
    },
    {
      title: "Process time (seconds)",
      dataIndex: "process_time_sec",
      key: "process_time_sec",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Start",
      dataIndex: "id",
      align: "center",
      key: "start_button",
      render: (text) => {
        const pool = pools.find((pool) => pool.id === text);
        return (
          <StartButton
            machineId={text}
            process_time_sec={pool.process_time_sec}
          />
        );
      },
    },
  ];

  const tableContainerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
  };

  const PriceButtons = ({ record }) => {
    const handleButtonClick = (value) => {
      const updatedPools = pools.map((pool) =>
        pool.id === record.id
          ? {
              id: pool.id,
              pool: pool.pool + value,
              min_price: pool.min_price,
              process_time_sec: pool.process_time_sec,
            }
          : pool
      );
      setPools(updatedPools);
    };

    const resetPool = () => {
      const updatedPools = pools.map((pool) =>
        pool.id === record.id
          ? {
              id: pool.id,
              pool: 0,
              min_price: pool.min_price,
              process_time_sec: pool.process_time_sec,
            }
          : pool
      );
      setPools(updatedPools);
    };

    return (
      <div>
        <Button onClick={() => handleButtonClick(1)}>1</Button>
        <Button onClick={() => handleButtonClick(5)}>5</Button>
        <Button onClick={() => handleButtonClick(10)}>10</Button>
        <Button onClick={() => resetPool()}>X</Button>
      </div>
    );
  };

  const StartButton = ({ machineId, process_time_sec }) => {
    const handleClick = async () => {
      const { data, error } = await MachineStart(machineId, process_time_sec);
      data && console.log(`Machine ${machineId} started.`, data);
      error && console.error(`Error starting Machine ${machineId}.`, error);

      if (data) {
        setResponseMessage(data.message);
        setModalVisible(true);
      }
    };

    return (
      <>
        <Button
          type="primary"
          onClick={handleClick}
          disabled={isDisabled(machineId)}
        >
          Start
        </Button>
        <Modal
          title="Response Message"
          open={modalVisible}
          onOk={handleModalClose}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>{responseMessage}</p>
        </Modal>
      </>
    );
  };

  const handleModalClose = () => {
    setModalVisible(false);
    window.location.reload();
  };

  const isDisabled = (machineId) => {
    const pool = pools.find((pool) => pool.id === machineId);
    // console.log(pool);
    return !pool || pool.pool < pool.min_price;
  };

  return (
    <div style={tableContainerStyle}>
      <Table dataSource={machines} columns={columns} centered />
    </div>
  );
}

export default MachineTable;
