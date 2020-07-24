import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { modalSelectionMode, selectionViewDirection } from "./constants";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ListItemSelectionModal({
  visible,
  mode,
  data,
  direction,
  searchTrailing,
  searchPlaceHolder,
  searchContainerStyle,
  onRenderData,
  onQuery,
  onSaved,
  onRequestClose,
}) {
  const [selection, updateSelection] = useState([]);
  if (!searchContainerStyle) {
    searchContainerStyle = { padding: 15 };
  }
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row", ...searchContainerStyle }}>
            <TextInput
              placeholder={searchPlaceHolder ? searchPlaceHolder : "Search"}
              onChangeText={(query) => onQuery(query, data)}
              style={{ padding: 0, flex: 1 }}
            />
            {searchTrailing}
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <CheckList
              data={data}
              selectedItems={selection}
              onUpdate={updateSelection}
              onRenderData={onRenderData}
              mode={mode}
              direction={direction}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              alignItems: "center",
              height: 96,
            }}
          >
            <Button
              buttonStyle={styles.saveButton}
              title={<AntDesign name="check" size={36} color="#78C83B" />}
              onPress={() => {
                onSaved(selection);
                onRequestClose();
              }}
            />
            <View style={{ flex: 1 }} />
            <Button
              buttonStyle={styles.saveButton}
              title={<Entypo name="cross" size={36} color="#F50103" />}
              onPress={onRequestClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function CheckList({
  data: dataList,
  selectedItems,
  onUpdate,
  onRenderData,
  mode,
  direction,
}) {
  let isSingleSelection = mode === modalSelectionMode.single;
  let checkIcon = isSingleSelection ? "dot-circle-o" : undefined;
  let uncheckedIcon = isSingleSelection ? "circle-o" : undefined;

  const onSelect = (item) => {
    let isSelected = selectedItems.includes(item);
    let updatedSelection = new Set(selectedItems);
    if (isSingleSelection) {
      if (!isSelected) {
        onUpdate([item]);
      }
    } else {
      if (!isSelected) {
        updatedSelection.add(item);
      } else {
        updatedSelection.delete(item);
      }
      onUpdate([...updatedSelection]);
    }
  };

  return (
    <View style={{ width: "100%", backgroundColor: "#F5F5F5" }}>
      {dataList.map((data) => {
        let isSelected = selectedItems.includes(data);
        let isRight = direction === selectionViewDirection.right;
        return (
          <TouchableOpacity
            style={{
              ...styles.row,
              borderBottomWidth: 1,
              borderBottomColor: "#E3E0D9",
            }}
            onPress={() => onSelect(data)}
          >
            {onRenderData(data)}
            <CheckBox
              checked={isSelected}
              checkedIcon={checkIcon}
              uncheckedIcon={uncheckedIcon}
              iconRight={isRight}
              checkedColor="green"
              onPress={() => onSelect(data)}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  titleText: { fontSize: 24, textAlign: "center", padding: 16 },
  checkBoxStyle: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    margin: 0,
    paddingHorizontal: 0,
  },
  saveButton: {
    alignSelf: "baseline",
    borderRadius: 2,
    backgroundColor: "#EBEBEB",
    height: 60,
    width: 80,
  },
  headingView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
