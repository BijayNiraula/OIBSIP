import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../../../store/slices/cartSlice';

interface RemoveCartsItemProps {
  _id: string
}

const RemoveCartsItemBtn: React.FC<RemoveCartsItemProps> = ({ _id }) => {
  const dispatch = useDispatch();
  const handleRemoveCartsItem = () => {
    dispatch(remove(_id))
  }
  return (
    <button onClick={handleRemoveCartsItem} className='btn '><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-danger bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    </svg></button>
  )
}

export default memo(RemoveCartsItemBtn)