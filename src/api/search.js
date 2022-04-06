import { useQuery, useMutation, useQueryClient } from "react-query";

const resultsQueryKey = "results";
const starredQueryKey = "starred";

export const useSearch = (searchQuery) => {
  return useQuery(resultsQueryKey, async () => {
    const response = await fetch(
      `http://localhost:3001/search?q=${searchQuery}`
    );
    return await response.json();
  });
};

export const useUpdateStarredFlag = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      const response = await fetch(
        `http://localhost:3001/search/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    },
    {
      onSuccess: (newData) => {
        const oldData = queryClient.getQueryData(resultsQueryKey);
        const starredResults = queryClient.getQueryData(starredQueryKey);
        const updatedResults = oldData.map((item) => {
          if (item.id === newData.id) {
            item = newData;
          }
          return item;
        });
        if (newData.starred) {
          starredResults.push(newData);
        } else {
          let starredIndex = starredResults.findIndex(
            (item) => item.id === newData.id
          );
          starredResults.splice(starredIndex, 1);
        }
        queryClient.setQueryData(resultsQueryKey, updatedResults);
        queryClient.setQueryData(starredQueryKey, starredResults);
      },
    }
  );
};

export const useCart = (starred = true) => {
  return useQuery(starredQueryKey, async () => {
    const response = await fetch(
      `http://localhost:3001/search?starred=${starred}`
    );
    return await response.json();
  });
};
