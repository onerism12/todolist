import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Icon,
  Link,
  Text,
  Image,
  Checkbox,
  Stack,
  useToast,
  Input,
} from "@chakra-ui/react";
import {
  IoAddSharp,
  IoChevronBackSharp,
  IoEllipse,
  IoTrashOutline,
} from "react-icons/io5";

import {
  deleteTodolist,
  getActivityById,
  getAllTodolist,
  updateActivity,
  updateTodolist,
} from "../../api";
import { useRouter } from "next/router";
import { Activity, Todolist } from "../../interfaces";
import DeleteModal from "../../components/DeleteModal";

import { BsPencil } from "react-icons/bs";
import AddTodolistModal from "./AddTodolistModal";
import EditTodolistModal from "./EditTodolistModal";

const DashboardTodolist = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [todolist, setTodolist] = useState<Todolist[]>([]);
  const [checkedItemId, setCheckedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isTodolistModalOpen, setIsTodolistModalOpen] = useState(false);
  const [isEditTodolistModalOpen, setIsEditTodolistModalOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;

  const fetchTodolist = async (activity_group_id: number) => {
    const data = await getAllTodolist(activity_group_id);
    setTodolist(data);
  };
  const fetchActivity = async (id: string) => {
    const data = await getActivityById(id);
    setActivity(data);
    setTitle(data.title);
  };

  const handleUpdateActivityTitle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
    if (activity) {
      const updatedActivity = await updateActivity(activity.id, {
        ...activity,
        title: event.target.value,
      });
      setActivity(updatedActivity);
    }
  };

  const handleCheckboxChange = (itemId) => {
    if (itemId === checkedItemId) {
      setCheckedItemId(null);
    } else {
      setCheckedItemId(itemId);
    }
  };

  const handleUpdateTodolist = async (updatedItem: Todolist) => {
    try {
      await updateTodolist(updatedItem.id, updatedItem);
      toast({
        title: "Todolist",
        description: "Berhasil diperbarui",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    }
    handleCloseEditFormModal();
  };

  const handleDeleteTodolist = async () => {
    try {
      await deleteTodolist(itemIdToDelete);
      toast({
        title: "Kegiatan ",
        description: "Berhasil Dihapus",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    }
    if (typeof id === "string") {
      const parsedId = parseInt(id, 10);
      fetchTodolist(parsedId);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTodolistFormModal = (id) => {
    setItemIdToDelete(id);
    setIsModalOpen(true);
  };
  const handleOpenTodolistFormModal = () => {
    setIsTodolistModalOpen(true);
  };
  const handleCloseTodolistFormModal = () => {
    setIsTodolistModalOpen(false);
    if (typeof id === "string") {
      const parsedId = parseInt(id, 10);
      fetchTodolist(parsedId);
      fetchActivity(id);
    }
  };

  const handleOpenEditFormModal = () => {
    setIsEditTodolistModalOpen(true);
  };
  const handleCloseEditFormModal = () => {
    setIsEditTodolistModalOpen(false);
    if (typeof id === "string") {
      const parsedId = parseInt(id, 10);
      fetchTodolist(parsedId);
      fetchActivity(id);
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      const parsedId = parseInt(id, 10);
      fetchTodolist(parsedId);
      fetchActivity(id);
    }
  }, [id]);

  const listTagColor: Record<string, string> = {
    "very-high": "#ED4C5C",
    high: "#F8A541",
    normal: "#00A790",
    low: "#428BC1",
    "very-low": "#8942C1",
  };

  return (
    <ChakraProvider>
      <Layout title="TO DO LIST APP">
        <Box data-cy="dashboard">
          <Flex justifyContent="space-between" alignItems="center" py="12">
            <Flex alignItems="center">
              <Link href="/" mr="6" pt="3">
                <Icon as={IoChevronBackSharp} w="8" h="8" />
              </Link>
              <Input
                id="title-input"
                fontSize="4xl"
                fontWeight="bold"
                type="text"
                value={title}
                onChange={handleUpdateActivityTitle}
                variant="unstyled"
                _focus={{
                  borderColor: "blue.400",
                  borderBottom: "1px solid",
                }}
              />
              <Icon
                cursor="pointer"
                as={BsPencil}
                color="#A4A4A4"
                w="5"
                h="5"
                onClick={() => {
                  document.getElementById("title-input").focus();
                }}
              />
            </Flex>
            <Button
              type="submit"
              bg=" #16ABF8"
              rounded="full"
              p="7"
              color="white"
              fontSize="xl"
              leftIcon={<Icon as={IoAddSharp} w={8} h={8} />}
              _hover={{ bg: "#16ABF8" }}
              onClick={handleOpenTodolistFormModal}
            >
              Tambah
            </Button>
            <AddTodolistModal
              isOpen={isTodolistModalOpen}
              onClose={handleCloseTodolistFormModal}
            />
          </Flex>
          {todolist.length === 0 ? (
            <form>
              <Image
                display="flex"
                alignItems="center"
                src="/pic/activity-empty-state.png"
                alt="Empty state"
              />
            </form>
          ) : (
            <Stack spacing={3}>
              {todolist.map((item) => (
                <Flex
                  w="full"
                  p={7}
                  rounded="xl"
                  alignItems="center"
                  boxShadow="0px 6px 10px rgba(0, 0, 0, 0.1);"
                  justifyContent="space-between"
                  alignContent="center"
                  key={item.id}
                >
                  <Flex alignItems="center">
                    <Checkbox
                      size="lg"
                      onChange={() => handleCheckboxChange(item.id)}
                      isChecked={item.id === checkedItemId}
                    />

                    <Icon
                      as={IoEllipse}
                      color={listTagColor[item.priority] ?? "red.600"}
                      w="6"
                      h="6"
                      mx={4}
                    />
                    <Text
                      as="span"
                      textDecoration={
                        item.id === checkedItemId ? "line-through" : ""
                      }
                      mr="4"
                    >
                      {item.title}
                    </Text>
                    <Icon
                      cursor="pointer"
                      as={BsPencil}
                      color="#A4A4A4"
                      w="4"
                      h="4"
                      onClick={handleOpenEditFormModal}
                    />
                    <EditTodolistModal
                      onSubmit={handleUpdateTodolist}
                      isOpen={isEditTodolistModalOpen}
                      onClose={handleCloseEditFormModal}
                      item={todolist[0]}
                    />
                  </Flex>
                  <Box>
                    <Icon
                      as={IoTrashOutline}
                      w={6}
                      h={6}
                      onClick={() => handleDeleteTodolistFormModal(item.id)}
                      cursor="pointer"
                      color="#888888"
                    />
                    <DeleteModal
                      id={itemIdToDelete}
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onDelete={handleDeleteTodolist}
                      title={item.title}
                    />
                  </Box>
                </Flex>
              ))}
            </Stack>
          )}
        </Box>
      </Layout>
    </ChakraProvider>
  );
};

export default DashboardTodolist;
