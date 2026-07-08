import axios from "axios";

const API_URL = "http://localhost:8080/students";

export const createStudent = async (studentData) => {
const response = await axios.post(API_URL, studentData);
return response.data;
};

export const getAllStudents = async (page = 0, size = 10) => {
const response = await axios.get(
`${API_URL}?page=${page}&size=${size}`
);
return response.data;
};

export const getStudentById = async (studentId) => {
const response = await axios.get(`${API_URL}/${studentId}`);
return response.data;
};

export const searchStudent = async (studentId) => {
const response = await axios.get(
`${API_URL}/search?studentId=${studentId}`
);
return response.data;
};
