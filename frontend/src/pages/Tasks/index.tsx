import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import "./styles.css";
import {
  Button,
  DialogActionTrigger,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { setToken, setUser } from "../../redux/user.reducer";
import { TaskForm } from "./interface";
import { Slide, toast } from "react-toastify";
import {
  setTaskIsError,
  setTaskIsLoading,
  setTasks,
} from "../../redux/task.reducer";
import axios from "axios";
import TaskCard from "../../components/TasksCard";
import { Task } from "../../components/TasksCard/interface";

const intialState = {
  title: "",
  description: "",
};

const Tasks = () => {
  const { user, token } = useSelector((state: any) => state.userReducer);
  const { tasks, isLoading } = useSelector((state: any) => state.taskReducer);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState<TaskForm>(intialState);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!newTask.title) {
      toast.error("title is required", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      return;
    }
    dispatch(setTaskIsLoading());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/task/create`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, res.data.task);
      const { task } = res?.data;
      dispatch(setTasks([...tasks, task]));
      toast.success("New task added", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
    } catch (error: any) {
      console.error(error?.response?.data.error || error);
      toast.error(error?.response?.data.error || error, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setTaskIsError());
    }
  };

  const getTasks = async () => {
    dispatch(setTaskIsLoading());
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/task/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTasks(res.data.tasks));
    } catch (error: any) {
      console.error(error?.response?.data.error || error);
      toast.error(error?.response?.data.error || error, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setTaskIsError());
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    dispatch(setTaskIsLoading());
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/task/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newData = tasks.filter((task: Task) => task._id !== id);
      dispatch(setTasks(newData));
      toast.success("Task deleted", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
    } catch (error: any) {
      console.error(error?.response?.data.error || error);
      toast.error(error?.response?.data.error || error, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setTaskIsError());
    }
  };

  const handleUpdate = async (id: string, body: any) => {
    dispatch(setTaskIsLoading());
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/task/update/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.task);
      const newData = tasks.map((task: Task) => {
        console.log(task._id === id);
        if (task._id === id) {
          return res.data.task;
        } else {
          return task;
        }
      });
      console.log(newData);
      dispatch(setTasks(newData));
      toast.success("Task Updated", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
    } catch (error: any) {
      console.error(error?.response?.data.error || error);
      toast.error(error?.response?.data.error || error, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setTaskIsError());
    }
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <h3>Welcome! {user?.name.split(" ")[0]}</h3>
        <div>
          <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
              <Button variant="outline">Create New Task</Button>
            </DialogTrigger>
            <DialogContent padding={"20px"}>
              <DialogHeader margin={"10px"} textAlign={"center"}>
                <DialogTitle>Add New Task</DialogTitle>
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
                  onClick={handleCreate}
                >
                  {isLoading ? "Loading..." : "Create"}
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <TaskCard handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Tasks;
