import toast from 'react-hot-toast';

const create = async (data) => {
  try {
    fetch('https://presstointeract.com/api/post', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch (error) {
    throw new Error(error);
  }
};

const onSubmit = async (data) => {
  try {
    toast.promise(
      create(data),
      {
        loading: 'Working on it...',
        success: 'Post added successfully!',
        error: 'Oops! Something went wrong.',
      },
      {
        duration: 3000,
      }
    );
  } catch (error) {
    toast.error(error);
  }
};

const update = async (data) => {
  try {
    fetch('https://presstointeract.com/api/post', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
  } catch (error) {
    throw new Error(error);
  }
};

const onUpdate = async (data) => {
  try {
    toast.promise(
      update(data),
      {
        loading: 'Working on it...',
        success: 'Post updated successfully!',
        error: 'Oops! Something went wrong.',
      },
      {
        duration: 3000,
      }
    );
  } catch (error) {
    toast.error(error);
  }
};

const remove = async (data) => {
  try {
    fetch('https://presstointeract.com/api/post', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error(error);
  }
};

const onDelete = async (data) => {
  try {
    toast.promise(
      remove(data),
      {
        loading: 'Working on it...',
        success: 'Post removed successfully',
        error: 'Oops! Something went wrong.',
      },
      {
        duration: 3000,
      }
    );
  } catch (error) {
    toast.error(error);
  }
};

const getPost = async (slug) => {
  try {
    const res = await fetch(`https://presstointeract.com/api/post/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (data) => {
  try {
    fetch('https://presstointeract.com/api/post/comment', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    fetch(`https://presstointeract.com/api/user`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    });
  } catch (error) {
    console.log(error);
  }
};

export { onSubmit, onUpdate, onDelete, getPost, createComment, updateUser };
