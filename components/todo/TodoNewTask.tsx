import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onAddTask: (title: string) => void;
};

export default function TodoNewTask({ onAddTask }: Props) {
  const [task, setTask] = React.useState('');

  const handleAddTask = () => {
    if (!task.trim()) return;
    onAddTask(task);
    setTask('');
  };

  const isTaskEmpty = task.trim() === '';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        placeholderTextColor="#888"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isTaskEmpty ? '#ccc' : '#333' }]}
        onPress={handleAddTask}
        disabled={isTaskEmpty}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 4,
    paddingRight: 8,
    color: '#000',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
