import { useState } from 'react';
import styles from './CollectionModal.module.css';
import toast from 'react-hot-toast';

export default function CollectionModal({ collection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: collection.name,
    thumbnail: collection.thumbnail,
    description: collection.description,
  });

  const handleEdit = (e) => {
    if (e.target.id === 'edit') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    const id = collection.id;
    const data = { ...formData, id };
    try {
      await fetch('https://presstointeract.com/api/collection', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success('Collection deleted successfully!');
    }
  };

  const handleSave = async () => {
    try {
      const id = collection.id;
      const data = { ...formData, id };
      await fetch('https://presstointeract.com/api/collection', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });
      toast.success('Collection updated successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={handleDelete}>Delete</button>
        <button id='edit' onClick={handleEdit}>
          Edit
        </button>
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.wrapper}>
            <div className={styles.io}>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className={styles.io}>
              <label htmlFor='thumbnail'>Thumbnail</label>
              <input
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>
            <div className={styles.io}>
              <label htmlFor='description'>Description</label>
              <textarea
                rows={10}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className={styles.buttons}>
              <button id='cancel' onClick={handleEdit}>
                Cancel
              </button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
