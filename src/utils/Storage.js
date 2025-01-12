
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
