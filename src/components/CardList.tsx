import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedImageURL, setSelectedImageURL] = useState('');

  function handleViewImage(url: string): void {
    setSelectedImageURL(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={10} mb="40px">
        {cards.map(cardItem => (
          <Card
            key={cardItem.id}
            data={cardItem}
            viewImage={() => handleViewImage(cardItem.url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageURL}
      />
    </>
  );
}
