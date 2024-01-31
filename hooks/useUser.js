import { useQuery } from '@tanstack/react-query';

const useUser = (id) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return (
        await fetch(`https://presstointeract.com/api/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })
      ).json();
    },
    refetchOnWindowFocus: false,
  });
};

export default useUser;
