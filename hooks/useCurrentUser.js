import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return (
        await fetch('https://presstointeract.com/api/current', {
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

export default useCurrentUser;
