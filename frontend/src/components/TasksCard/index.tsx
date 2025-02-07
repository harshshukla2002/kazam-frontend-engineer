import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  DialogActionTrigger,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { createListCollection } from "@chakra-ui/react";

import "./styles.css";
import { Task, TaskCardProps } from "./interface";
import { Checkbox } from "../ui/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

const intialState = {
  title: "",
  description: "",
  isCompleted: false,
  userId: "",
  _id: "",
};

function TaskCard({ handleDelete, handleUpdate }: TaskCardProps) {
  const { tasks, isLoading, isError } = useSelector(
    (state: any) => state.taskReducer
  );
  const collection = createListCollection({
    items: [
      { label: "All", value: "all" },
      { label: "Completed", value: "completed" },
      { label: "Pending", value: "pending" },
    ],
  });
  const [filteredData, setFilteredData] = useState<Task[] | null>(null);
  const [searchedData, setSearchedData] = useState<Task[] | null>(null);
  const [newTask, setNewTask] = useState<Task>(intialState);

  const handleFilter = (value: string) => {
    if (value === "completed") {
      let newData = tasks.filter((task: Task) => task.isCompleted === true);
      setFilteredData(newData);
    } else if (value === "pending") {
      let newData = tasks.filter((task: Task) => task.isCompleted === false);
      setFilteredData(newData);
    } else {
      setFilteredData(null);
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setSearchedData(null);
    } else {
      if (filteredData) {
        const newData = filteredData.filter((task: Task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchedData(newData);
      } else {
        const newData = tasks.filter((task: Task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchedData(newData);
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <div className="header-task">
        <Input
          placeholder="enter title to search..."
          padding={"4px 10px"}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <SelectRoot collection={collection} size="sm" width="320px">
          <SelectTrigger>
            <SelectValueText placeholder="All" padding={"4px 10px"} />
          </SelectTrigger>
          <SelectContent padding={"4px 10px"}>
            {collection.items.map((item) => (
              <SelectItem
                padding={"4px 10px"}
                item={item}
                key={item.value}
                onClick={() => handleFilter(item.value)}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
      <div className="card-container">
        {isLoading && <h3>Loading....</h3>}
        {isError && <h3>oops!!... error occured</h3>}
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map((item: Task) => {
            return (
              <div key={item._id} className="task-container">
                <Checkbox
                  onChange={(e: any) =>
                    handleUpdate(item._id, { isCompleted: !item.isCompleted })
                  }
                  checked={item.isCompleted}
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <DialogRoot
                    placement={"center"}
                    motionPreset="slide-in-bottom"
                  >
                    <DialogTrigger asChild>
                      <AiFillEdit
                        size={"25px"}
                        style={{ cursor: "pointer" }}
                        onClick={() => setNewTask(item)}
                      />
                    </DialogTrigger>
                    <DialogContent padding={"20px"}>
                      <DialogHeader margin={"10px"} textAlign={"center"}>
                        <DialogTitle>Update Task</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Field.Root>
                          <Field.Label>Title</Field.Label>
                          <Input
                            padding={"4px 10px"}
                            placeholder="enter task name"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            required
                          />
                          <Field.Label>Description</Field.Label>
                          <Textarea
                            padding={"4px 10px"}
                            placeholder="enter description"
                            height={"70px"}
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            required
                          />
                        </Field.Root>
                      </DialogBody>
                      <DialogFooter marginTop={"20px"}>
                        <DialogActionTrigger asChild>
                          <Button padding={"4px 10px"} variant="outline">
                            Cancel
                          </Button>
                        </DialogActionTrigger>
                        <Button
                          padding={"4px 10px"}
                          disabled={isLoading}
                          onClick={() => handleUpdate(item._id, newTask)}
                        >
                          {isLoading ? "Loading..." : "Update"}
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  <MdDelete
                    size={"25px"}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </div>
            );
          })}
        {searchedData &&
          searchedData.length > 0 &&
          searchedData.map((item: Task) => {
            return (
              <div key={item._id} className="task-container">
                <Checkbox
                  onChange={(e: any) =>
                    handleUpdate(item._id, { isCompleted: !item.isCompleted })
                  }
                  checked={item.isCompleted}
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <DialogRoot
                    placement={"center"}
                    motionPreset="slide-in-bottom"
                  >
                    <DialogTrigger asChild>
                      <AiFillEdit
                        size={"25px"}
                        style={{ cursor: "pointer" }}
                        onClick={() => setNewTask(item)}
                      />
                    </DialogTrigger>
                    <DialogContent padding={"20px"}>
                      <DialogHeader margin={"10px"} textAlign={"center"}>
                        <DialogTitle>Update Task</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Field.Root>
                          <Field.Label>Title</Field.Label>
                          <Input
                            padding={"4px 10px"}
                            placeholder="enter task name"
                            name="title"
                            value={newTask.title || item.title}
                            onChange={handleChange}
                            required
                          />
                          <Field.Label>Description</Field.Label>
                          <Textarea
                            padding={"4px 10px"}
                            placeholder="enter description"
                            height={"70px"}
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            required
                          />
                        </Field.Root>
                      </DialogBody>
                      <DialogFooter marginTop={"20px"}>
                        <DialogActionTrigger asChild>
                          <Button padding={"4px 10px"} variant="outline">
                            Cancel
                          </Button>
                        </DialogActionTrigger>
                        <Button
                          padding={"4px 10px"}
                          disabled={isLoading}
                          onClick={() => handleUpdate(item._id, newTask)}
                        >
                          {isLoading ? "Loading..." : "Update"}
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  <MdDelete
                    size={"25px"}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </div>
            );
          })}
        {!isLoading &&
          !isError &&
          tasks &&
          !filteredData &&
          !searchedData &&
          tasks.length > 0 &&
          tasks.map((task: Task) => {
            return (
              <div key={task._id} className="task-container">
                <Checkbox
                  onChange={(e: any) =>
                    handleUpdate(task._id, { isCompleted: !task.isCompleted })
                  }
                  checked={task.isCompleted}
                />
                <div>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <DialogRoot
                    placement={"center"}
                    motionPreset="slide-in-bottom"
                  >
                    <DialogTrigger asChild>
                      <AiFillEdit
                        size={"25px"}
                        style={{ cursor: "pointer" }}
                        onClick={() => setNewTask(task)}
                      />
                    </DialogTrigger>
                    <DialogContent padding={"20px"}>
                      <DialogHeader margin={"10px"} textAlign={"center"}>
                        <DialogTitle>Update Task</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Field.Root>
                          <Field.Label>Title</Field.Label>
                          <Input
                            padding={"4px 10px"}
                            placeholder="enter task name"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            required
                          />
                          <Field.Label>Description</Field.Label>
                          <Textarea
                            padding={"4px 10px"}
                            placeholder="enter description"
                            height={"70px"}
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            required
                          />
                        </Field.Root>
                      </DialogBody>
                      <DialogFooter marginTop={"20px"}>
                        <DialogActionTrigger asChild>
                          <Button padding={"4px 10px"} variant="outline">
                            Cancel
                          </Button>
                        </DialogActionTrigger>
                        <Button
                          padding={"4px 10px"}
                          disabled={isLoading}
                          onClick={() => handleUpdate(task._id, newTask)}
                        >
                          {isLoading ? "Loading..." : "Update"}
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  <MdDelete
                    size={"25px"}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TaskCard;
