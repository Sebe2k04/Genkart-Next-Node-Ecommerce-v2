import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
  } from "@material-tailwind/react";
const DeleteProduct = () => {
    const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setCurrent(data);
    setOpen(!open);
  };
  return (
    <div>
      <Dialog className="bg-gray-100 h-[80vh]" open={open} handler={handleOpen}>
        <DialogHeader>
          <div className="flex w-full justify-between gap-20">
            <h1>View</h1>
            <Button
              variant="text"
              color="blue"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="relative h-[60vh] overflow-y-scroll"></div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </div>
  )
}

export default DeleteProduct
