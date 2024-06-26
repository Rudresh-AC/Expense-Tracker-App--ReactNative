import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpensItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensItem}
      keyExtractor={(item) => item.id}
    />
  );
}
