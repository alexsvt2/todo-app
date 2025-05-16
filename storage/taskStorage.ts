import { Task } from "@/types/task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tasks";

const saveTasks = async (tasks: Task[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks:", error);
    }
};

const loadTasks = async () => {
    try {
        const tasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (!tasks) {
            await saveTasks([{ id: "1", title: "First task", completed: true }]);
            return [{ id: "1", title: "First task", completed: true }];
        }
        return JSON.parse(tasks);
    } catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}

export {
    loadTasks, saveTasks
};

