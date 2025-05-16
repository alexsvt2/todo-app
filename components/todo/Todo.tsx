
import { loadTasks, saveTasks } from "@/storage/taskStorage";
import { Filter } from "@/types/filter";
import { Task } from "@/types/task";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import TodoFilter from "./TodoFilter";
import TodoNewTask from "./TodoNewTask";



export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const loaded = await loadTasks();
      const sorted = loaded.sort((a: { id: any; }, b: { id: any; }) => Number(b.id) - Number(a.id));
      setTasks(sorted);
    } catch (e) {
      console.error("Error loading tasks:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    await saveTasks(updated);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  const deleteTask = async (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    await saveTasks(updated);
  };

  const getFilteredTasks = () => {
    if (filter === "To Do") return tasks.filter(t => !t.completed);
    if (filter === "Done") return tasks.filter(t => t.completed);
    return tasks;
  };

  const getSummary = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { completed, pending };
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Checkbox value={item.completed} onValueChange={v => toggleTask(item.id, v)}/>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>My Tasks</Text>

          <TodoNewTask onAddTask={addTask} />
          <TodoFilter filter={filter} onChangeFilter={setFilter} />

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
          ) : (
            <FlatList
              data={getFilteredTasks()}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
            />
          )}
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              {getSummary().pending} tasks left · {getSummary().completed} completed
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loading: {
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
  summary: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
