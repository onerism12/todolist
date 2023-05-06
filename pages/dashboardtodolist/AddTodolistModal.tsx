import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  ModalCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { addTodolist } from "../../api";
import { Todolist } from "../../interfaces";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddTodolistModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<Todolist>({
    id: 0,
    title: "",
    priority: "very-high",
    activity_group_id: 0,
  });

  const toast = useToast();
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      await addTodolist(formData);
      toast({
        title: "Kegiatan ",
        description: "Berhasil Ditambah",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setFormData({
        activity_group_id: typeof id === "string" ? parseInt(id, 10) : 0,
        title: "",
        priority: "",
      });
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  function handleFormChange(event) {
    const { name: title, value } = event.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [title]: value,
    }));
  }

  const listTag: Record<string, string> = {
    "very-high": "Very High",
    high: "High",
    normal: "Medium",
    low: "Low",
    "very-low": "Very Low",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent py="4">
        <ModalHeader borderBottomColor="#E5E5E5" borderBottomWidth="1px" px="8">
          <Flex justifyContent="space-between">
            <Text>Tambah List Item</Text>
            <ModalCloseButton mt="4" mr="4" size="lg" color="#A4A4A4" />
          </Flex>
        </ModalHeader>
        <ModalBody px="8">
          <FormControl my="8">
            <Text fontSize="xs" fontWeight="bold" mb="2">
              NAMA LIST ITEM
            </Text>
            <Input
              size="lg"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Tambahkan nama Activity"
            />
          </FormControl>
          <FormControl mt={4}>
            <Text fontSize="xs" fontWeight="bold" mb="2">
              PRIORITY
            </Text>
            <Select
              size="lg"
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
              w="205px"
              placeholder="Pilih Prioritas"
            >
              {Object.entries(listTag).map(([priority, tag]) => (
                <option key={priority} value={priority}>
                  {tag}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter
          borderTopColor="#E5E5E5"
          borderTopWidth="1px"
          mt="4"
          pt="6"
        >
          <Button
            variant="ghost"
            rounded="full"
            bg="#16ABF8"
            w="140px"
            h="50px"
            fontSize="lg"
            color="white"
            _hover={{ bg: "#16ABF8" }}
            colorScheme="blue"
            onClick={handleFormSubmit}
            isDisabled={!formData.title}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTodolistModal;
