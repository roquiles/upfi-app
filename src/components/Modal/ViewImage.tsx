import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="900px" maxH="600px" w="fit-content" h="fit-content">
        <ModalBody padding={0}>
          <Image
            src={imgUrl}
            alt="Selected image"
            maxH="600px"
            maxW="900px"
            objectFit="cover"
          />
        </ModalBody>
        <ModalFooter
          h="8"
          bgColor="pGray.800"
          justifyContent="left"
          borderRadius="0 0 6px 6px"
        >
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
