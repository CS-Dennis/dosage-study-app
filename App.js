/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
// import type { Node } from 'react';
import { Alert, Button, StatusBar, Text, TextInput, View } from 'react-native';
import { allUnits, unitMatch } from './utils';
import SelectDropdown from 'react-native-select-dropdown';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [selectedUnit1, setSelectedUnit1] = useState("mg");
  const [selectedUnit2, setSelectedUnit2] = useState("mcg");
  const [rightUnitList, setRightUnitList] = useState(["mcg", "grain", "gram"]);

  const selectLeftItem = (selectedItem) =>{
    setSelectedUnit1(selectedItem);
    const keys = Object.keys(unitMatch(selectedItem));
    console.log(unitMatch(selectedItem));
    console.log(keys);
    setRightUnitList(keys)
    setSelectedUnit2(keys[0]);
  }

  const convert = () => {
    const float1 = Number.parseFloat(num1);
    console.log(float1);
    console.log(selectedUnit1);
    console.log(selectedUnit2);
    console.log(float1*unitMatch(selectedUnit1)[selectedUnit2]);
    const float2 = float1*unitMatch(selectedUnit1)[selectedUnit2];
    setNum2(float2.toString());
  };

  const switchNums = () => {
    const temp = Number.parseFloat(num1).toString();
    setNum1(Number.parseFloat(num2).toString());
    setNum2(temp);
  };

  return (
    <>
      <StatusBar barStyle={'default'} backgroundColor={'grey'} />
      <View style={{ backgroundColor: '', marginTop: '10%' }}>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Dosage Converter</Text>
      </View>

      {/* line 1 for numbers */}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: "40%" }}>
          <TextInput placeholder='Number 1' keyboardType='numeric' selectTextOnFocus={true} value={num1} onChangeText={(e) => setNum1(e)} style={{ borderWidth: 1, marginLeft: 5, backgroundColor: "white" }} />
        </View>

        <View style={{ width: "20%", marginLeft: 5, marginRight: 5 }}>
          <Button title='Swtich' onPress={switchNums} />
        </View>

        <View style={{ width: "40%" }}>
          <TextInput editable={false} placeholder='Number 2' keyboardType='numeric' value={num2} onChangeText={(e) => setNum2(e)} style={{ borderWidth: 1, marginRight: 15, color: 'black', backgroundColor: '#e1e1e0'}} />
        </View>
      </View>

      {/* line 2 for unit selections */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: "40%" }}>
          <SelectDropdown
            buttonStyle={{ width: "100%" }}
            data={allUnits}
            onSelect={(selectedItem) => {
              selectLeftItem(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            defaultValue={allUnits[0]}
          />
        </View>
        <View style={{ width: '20%' }} />
        <View style={{ width: "40%" }}>
          <SelectDropdown
            buttonStyle={{ width: "100%" }}
            data={rightUnitList}
            onSelect={(selectedItem) => {
              setSelectedUnit2(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            defaultValue={rightUnitList[0]}
          />
        </View>
      </View>

      <View style={{ marginTop: '10%', width: '98%', alignSelf: 'center' }}>
        <Button title='Convert' onPress={convert} />
      </View>
    </>
  );
};

export default App;
