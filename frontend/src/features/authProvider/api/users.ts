import axiosInstance from "@/utils/axios";

export const checkUser = async (queryData: string) => {
  const response = await axiosInstance.post(`/telegram/init?${queryData}`);
  return response.data;
};
