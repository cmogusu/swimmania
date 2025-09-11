'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  isDisabled: boolean,
  onDelete: () => void
}

export const DeleteEntity = ({ onDelete, isDisabled }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const showDeleteModal = () => {

  }

  return (
    <button type="button" className="btn btn-square btn-ghost" onClick={showDeleteModal} disabled={isDisabled}>
      <AiOutlineDelete />
    </button>
  )
};
