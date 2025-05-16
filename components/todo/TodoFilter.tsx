import { Filter } from "@/types/filter";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const filters = ['All', 'To Do', 'Done'] as const;

export default function TodoFilter({
  filter,
  onChangeFilter,
}: {
  filter: Filter;
  onChangeFilter: (newFilter: Filter) => void;
}) {
  const handlePress = () => {
    const currentIndex = filters.indexOf(filter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    onChangeFilter(nextFilter);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, getStyleForFilter(filter)]}>
        <Text style={styles.text}>{filter}</Text>
      </View>
    </TouchableOpacity>
  );
}

const getStyleForFilter = (filter: string) => {
  switch (filter) {
    case 'To Do':
      return { backgroundColor: '#FFD700' };
    case 'Done':
      return { backgroundColor: '#90EE90' };
    default:
      return { backgroundColor: '#D3D3D3' };
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
