import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import axios from "axios";
import Table from "./components/Table";
import columnNames from "./components/Table/columns";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import EditPopup from "./components/EditPopup";
import Shopping from "./images/Shopping";
import Dollars from "./images/Dollars";
import Category from "./images/Category";
import { ITableData } from "./components/Table/types";

function App() {
  const [data, setData] = useState<ITableData[]>([]);
  const [mode, setMode] = useState("admin");
  const [cardState, setCardState] = useState({
    totalProduct: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    numberOfCategory: 0,
  });

  const [selectedData, setSelectedData] = useState({
    name: "",
    quantity: "",
    price: "",
    value: "",
    category: "",
  });
  const [loader, setLoader] = useState(false);
  const [disabledRows, setDisabledRows] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const getData = useCallback(
    async (url: string) => {
      try {
        setLoader(true);
        const { data } = await axios.get<ITableData[]>(url);
        setData(data);
        setCardState({
          ...cardState,
          totalProduct: data.length,
          totalStoreValue: data.reduce((acc: number, item: ITableData) => {
            return acc + Number(item.value.slice(1));
          }, 0),
          outOfStock: data.filter((item: ITableData) => item.quantity === 0)
            .length,
          numberOfCategory: new Set(
            data.map((item: ITableData) => item.category)
          ).size,
        });
        setLoader(false);
      } catch (error) {
        console.error(error);
      }
    },
    [cardState]
  );

  useEffect(() => {
    getData("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory");
  }, [getData]);

  function handleEdit(item: any) {
    setModalOpen(true);
    setSelectedData({ ...selectedData, ...item });
  }
  function handleDisable(item: any) {
    if (disabledRows.includes(item.name)) {
      setDisabledRows((prev) => prev.filter((name) => name !== item.name));
    } else {
      setDisabledRows((prev) => [...prev, item.name]);
    }
  }

  function handleDelete(item: ITableData) {
    const deletedData = data.filter(
      (data: ITableData) => data.name !== item.name
    );
    setData(deletedData);
  }

  function handleChange(e: any) {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value,
      value:
        e.target.name === "price"
          ? String(e.target.value.slice(1) * Number(selectedData?.quantity))
          : e.target.name === "quantity"
          ? String(e.target.value * Number(selectedData?.price.slice(1)))
          : "",
    });
  }

  function handleEditSave() {
    setData(
      (prevData) =>
        prevData.map((item) =>
          item.name === selectedData.name ? { ...item, ...selectedData } : item
        ) as ITableData[]
    );
    setModalOpen(false);
    setSelectedData({
      category: "",
      name: "",
      price: "",
      quantity: "",
      value: "",
    });
  }

  return (
    <div className="App bg-zinc-900 text-gray-200 p-4 h-screen flex flex-col gap-6">
      <Navbar mode={mode} setMode={setMode} />
      <p className="text-left text-4xl">Inventory stats</p>

      {loader ? (
        <Loader />
      ) : (
        <>
          <section className="flex justify-between items-center gap-4">
            <Card
              label="Total Products"
              value={cardState.totalProduct}
              Icon={<Shopping />}
            />
            <Card
              label="Total Store Value"
              value={cardState.totalStoreValue}
              Icon={<Dollars />}
            />
            <Card
              label="Out of Stocks"
              value={cardState.outOfStock}
              Icon={<Shopping />}
            />
            <Card
              label="Number of Categories"
              value={cardState.numberOfCategory}
              Icon={<Category />}
            />
          </section>
          <Table
            columns={columnNames}
            data={data}
            loader={loader}
            handleEdit={handleEdit}
            handleDisable={handleDisable}
            handleDelete={handleDelete}
            action="Action"
            disabledRows={disabledRows}
            mode={mode}
          />
        </>
      )}
      <Modal isOpen={isModalOpen}>
        <EditPopup
          handleClose={() => setModalOpen(false)}
          selectedData={selectedData}
          handleChange={handleChange}
          handleEditSave={handleEditSave}
        />
      </Modal>
    </div>
  );
}

export default App;
