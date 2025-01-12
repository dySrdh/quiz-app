import axios from "axios";

export const fetchQuestions = async (amount, type) => {
    try {
        const res = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=${type}`, {
            timeout: 10000, 
        });
        return res.data.results;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};

export const saveProgress = (data) => {
    try {
        localStorage.setItem("quizProgress", JSON.stringify(data));
    } catch (error) {
        console.error("Error saving progress to localStorage:", error);
    }
};

export const loadProgress = () => {
    try {
        const data = localStorage.getItem("quizProgress");
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error loading progress from localStorage:", error);
        return null;
    }
};

export const clearProgress = () => {
    try {
        localStorage.removeItem("quizProgress");
    } catch (error) {
        console.error("Error clearing progress from localStorage:", error);
    }
};
