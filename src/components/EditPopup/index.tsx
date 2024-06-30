import React from "react";
import Close from "../../images/Close";
import Input from "../Input";

const EditPopup = ({
  handleClose,
  selectedData,
  handleChange,
  handleEditSave,
}: any) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Edit product</h2>
        <div
          className="p-1 bg-zinc-800 flex rounded justify-center items-center h-full text-yellow-500 cursor-pointer"
          onClick={handleClose}
        >
          <Close />
        </div>
      </div>
      <div className="text-left text-lg">{selectedData.name}</div>
      <div className="flex justify-between items-center gap-4">
        <Input
          name="category"
          id="category"
          title="Category"
          placeholder="Category"
          type="text"
          value={selectedData.category}
          onChange={handleChange}
        />
        <Input
          name="price"
          id="price"
          title="Price"
          placeholder="Price"
          type="text"
          value={
            selectedData.price[0] === "$"
              ? `${selectedData.price}`
              : `$ ${selectedData.price}`
          }
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <Input
          name="quantity"
          id="quantity"
          title="Quantity"
          placeholder="Quantity"
          type="text"
          value={selectedData.quantity}
          onChange={handleChange}
        />
        <Input
          name="value"
          id="value"
          title="Value"
          placeholder="Value"
          type="text"
          value={
            selectedData.price[0] === "$"
              ? `$ ${
                  Number(selectedData.price.slice(1)) * selectedData.quantity
                }`
              : `$ ${Number(selectedData.price) * selectedData.quantity}`
          }
          onChange={handleChange}
          disabled={true}
        />
      </div>
      <div className="flex justify-end items-center gap-5">
        <button className="text-yellow-500" onClick={handleClose}>
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded-xl ${
            Object.values(selectedData).some((data) => data === "")
              ? "disabled bg-zinc-700 text-zinc-500"
              : "text-yellow-500"
          }`}
          onClick={handleEditSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPopup;
