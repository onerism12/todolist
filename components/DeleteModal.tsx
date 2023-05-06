import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";

interface DeleteModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  title: string;
}

const DeleteModal = ({
  id,
  isOpen,
  onClose,
  onDelete,
  title,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent px="12" py="2" rounded="xl">
        <ModalHeader
          justifyContent="center"
          display="flex"
          color="#ED4C5C"
          mt="2"
        >
          <Icon as={IoWarningOutline} w="20" h="20" />
        </ModalHeader>
        <ModalBody fontSize="lg" mb="10" mt="6" textAlign="center">
          Apakah anda yakin menghapus activity <b>“{title}”</b> ?
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button
            variant="ghost"
            mr={6}
            onClick={onClose}
            rounded="full"
            bg="#F4F4F4"
            w="140px"
            h="50px"
            fontSize="lg"
            color="#4A4A4A"
          >
            Batal
          </Button>
          <Button
            variant="ghost"
            mr={3}
            rounded="full"
            bg="#ED4C5C"
            w="140px"
            h="50px"
            fontSize="lg"
            color="white"
            _hover={{ bg: "#ED4C5C" }}
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
