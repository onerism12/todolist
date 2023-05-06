import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getAllActivity, deleteActivity, addActivity } from "../../api";
import { Activity } from "../../interfaces";
import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Text,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import DeleteModal from "../../components/DeleteModal";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useToast } from "@chakra-ui/react";

const DashboardActivity = () => {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [formData, setFormData] = useState<Activity>({
    email: "agitafajarprabowo@gmail.com",
    title: "New Activity",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTitle, setIsTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await addActivity(formData);
    setFormData({
      email: "agitafajarprabowo@gmail.com",
      title: "New Activity",
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchActivity("agitafajarprabowo@gmail.com");
  };

  useEffect(() => {
    fetchActivity("agitafajarprabowo@gmail.com");
  }, []);

  const fetchActivity = async (email: string) => {
    const data = await getAllActivity(email);
    setActivity(data);
  };

  const toast = useToast();

  const handleDeleteClick = (id) => {
    setItemIdToDelete(id);
    setIsTitle(formData.title);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteActivity(itemIdToDelete);
      toast({
        title: "Activity berhasil dihapus",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    }
    fetchActivity("agitafajarprabowo@gmail.com");
    setIsModalOpen(false);
  };

  return (
    <Box data-cy="dashboard">
      <Flex justifyContent="space-between" alignItems="center" py="12">
        <Text fontSize="4xl" fontWeight="bold">
          Activity
        </Text>
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            bg=" #16ABF8"
            rounded="full"
            p="7"
            color="white"
            fontSize="xl"
            leftIcon={<Icon as={IoAddSharp} w={8} h={8} />}
            _hover={{ bg: "#16ABF8" }}
            isLoading={isLoading}
          >
            Tambah
          </Button>
        </form>
      </Flex>
      {activity.length === 0 ? (
        <form onClick={handleSubmit}>
          <Image
            display="flex"
            alignItems="center"
            src="/pic/activity-empty-state.png"
            alt="Empty state"
          />
        </form>
      ) : (
        <Wrap spacing={4}>
          {activity.map((item) => (
            <WrapItem key={item.id}>
              <Card
                p={6}
                h="234px"
                justifyContent="space-between"
                w="235px"
                boxShadow="0 4px 8px rgba(0,0,0,0.15)"
                mb="2"
              >
                <Link
                  href={`/dashboardtodolist?id=${item.id}&title=${item.title}`}
                >
                  <Text h="150px" fontSize="lg" fontWeight="bold">
                    {item.title}
                  </Text>
                </Link>
                <Flex
                  justifyContent="space-between"
                  color="#888888"
                  alignItems="center"
                >
                  <Text>
                    {format(new Date(item.created_at), "dd MMM yyyy")}
                  </Text>
                  <Icon
                    as={IoTrashOutline}
                    w={6}
                    h={6}
                    onClick={() => handleDeleteClick(item.id)}
                    cursor="pointer"
                  />
                  <DeleteModal
                    id={itemIdToDelete}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleDelete}
                    title={isTitle}
                  />
                </Flex>
              </Card>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
};

export default DashboardActivity;
