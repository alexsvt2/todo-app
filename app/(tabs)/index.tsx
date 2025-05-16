
import Todo from "@/components/todo/Todo";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Todo />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
});