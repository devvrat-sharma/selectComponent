import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  ActivityIndicator,
} from "react-native";

import { Button } from "react-native-elements";
import ListItemSelectionModal from "./src/components/list_item_selection_modal";
import {
  modalSelectionMode,
  selectionViewDirection,
} from "./src/components/constants";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const data = [
  "Oats",
  "Potato",
  "Sugar beet",
  "Rye",
  "African Marigold",
  "Spring Rye",
  "Winter Rye",
];

class App extends React.Component<{}> {
  state = {
    isMultipleSelectionModalVisible: false,
    isSingleSelectionModalVisible: false,
    filteredData: data,
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.container}
          >
            <View style={{ height: 25 }} />
            <Button
              title={"Multiple Selection"}
              onPress={() => this.showMultipleSelectionModal(true)}
            />
            <View style={{ height: 25 }} />
            <Button
              title={"Single Selection"}
              onPress={() => this.showSingleSelectionModal(true)}
            />
            {this.renderModals()}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  renderModals = () => {
    const filterByStartsWith = (query) =>
      data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

    return (
      <View>
        <ListItemSelectionModal
          mode={modalSelectionMode.multiple}
          visible={this.state.isMultipleSelectionModalVisible}
          onRequestClose={() => this.showMultipleSelectionModal(false)}
          direction={selectionViewDirection.right}
          onRenderData={(item) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 30,
                width: "80%",
                paddingLeft: 15,
              }}
            >
              <MaterialIcons name="business-center" size={24} color="#7C7C7C" />
              <Text
                style={{
                  color: "red",
                  marginHorizontal: 15,
                  fontSize: 16,
                  color: "#767676",
                }}
              >
                {item}
              </Text>
            </View>
          )}
          searchPlaceHolder={"Search for crop item"}
          searchTrailing={<EvilIcons name="search" size={24} color="#797979" />}
          data={this.state.filteredData}
          onQuery={(query) => this.setFilteredData(filterByStartsWith(query))}
          onSaved={(finalItems) => console.log(finalItems)}
        />
        <ListItemSelectionModal
          mode={modalSelectionMode.single}
          visible={this.state.isSingleSelectionModalVisible}
          onRequestClose={() => this.showSingleSelectionModal(false)}
          direction={selectionViewDirection.left}
          onRenderData={(item) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                width: "80%",
                paddingLeft: 15,
              }}
            >
              <MaterialIcons name="business-center" size={24} color="#7C7C7C" />
              <Text
                style={{
                  color: "red",
                  marginHorizontal: 15,
                  fontSize: 16,
                  color: "#767676",
                }}
              >
                {item}
              </Text>
            </View>
          )}
          data={this.state.filteredData}
          searchPlaceHolder={"Search for crop item"}
          searchTrailing={<EvilIcons name="search" size={24} color="black" />}
          onQuery={(query) => this.setFilteredData(filterByStartsWith(query))}
          onSaved={(finalItems) => console.log(finalItems)}
        />
      </View>
    );
  };

  setFilteredData = (data) => {
    this.setState({ filteredData: data });
  };

  showMultipleSelectionModal = (isVisible) => {
    this.setState({ isMultipleSelectionModalVisible: isVisible });
  };

  showSingleSelectionModal = (isVisible) => {
    this.setState({
      isSingleSelectionModalVisible: isVisible,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 64,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "#fff",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
