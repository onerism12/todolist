import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Todolist } from "../../interfaces";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  Button,
  ModalCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";

interface ModalInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Todolist) => Promise<void>;
  item?: Todolist;
}

const EditTodolistModal: React.FC<ModalInputProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item = undefined,
}) => {
  const [updatedItem, setUpdatedItem] = useState<Todolist>({
    id: 0,
    title: "",
    priority: "very-high",
    activity_group_id: 0,
  });

  useEffect(() => {
    if (item) {
      setUpdatedItem(item);
    }
  }, [item]);

  const handleFormChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(updatedItem);
    onClose();
  };

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
            <Text>Edit List Item</Text>
            <ModalCloseButton mt="4" mr="4" size="lg" color="#A4A4A4" />
          </Flex>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody px="8">
            <FormControl my="8">
              <Text fontSize="xs" fontWeight="bold" mb="2">
                NAMA LIST ITEM
              </Text>
              <Input
                type="text"
                name="title"
                value={updatedItem.title}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <Text fontSize="xs" fontWeight="bold" mb="2">
                PRIORITY
              </Text>
              <Select
                name="priority"
                value={updatedItem.priority}
                onChange={handleFormChange}
                w="205px"
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
              type="submit"
            >
              Simpan
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditTodolistModal;
