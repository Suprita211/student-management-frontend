import axiosInstance from "../utils/axiosInstance";

export const createStudent = async (studentData) => {

  const response = await axiosInstance.post(
    "/students",
    studentData
  );

  return response.data;
};