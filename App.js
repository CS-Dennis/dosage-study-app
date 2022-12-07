/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// import type { Node } from 'react';
import {ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import {allUnits, unitMatch} from './utils';
import SelectDropdown from 'react-native-select-dropdown';
import {Button, IconButton} from 'react-native-paper';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState('0');
  const [selectedUnit1, setSelectedUnit1] = useState('mg');
  const [selectedUnit2, setSelectedUnit2] = useState('mcg');
  const [rightUnitList, setRightUnitList] = useState(['mcg', 'grain', 'gram']);
  // const [swap, setSwap] = useState(false);

  const selectLeftItem = selectedItem => {
    setSelectedUnit1(selectedItem);
    const keys = Object.keys(unitMatch(selectedItem));
    setRightUnitList(keys);
    setSelectedUnit2(keys[0]);
  };

  const convert = () => {
    const float1 = Number.parseFloat(num1);
    const float2 = float1 * unitMatch(selectedUnit1)[selectedUnit2];
    setNum2(float2.toString());
  };

  const switchNumsAndUnits = () => {
    const tempNumber = Number.parseFloat(num1).toString();
    setNum1(Number.parseFloat(num2).toString());
    setNum2(tempNumber);

    const tempUnit = selectedUnit1;
    selectLeftItem(selectedUnit2);
    setSelectedUnit2(tempUnit);
  };

  return (
    <ScrollView style={{backgroundColor: '#fafafa', height: '100%'}}>
      <StatusBar barStyle={'default'} backgroundColor={'grey'} />
      <View style={{backgroundColor: '', marginTop: '5%'}}>
        <Text style={{fontSize: 25, alignSelf: 'center', color: 'black'}}>
          Dosage Converter
        </Text>
      </View>

      {/* line 1 for numbers */}
      <View style={{flexDirection: 'row', marginTop: 50}}>
        <View style={{width: '45%'}}>
          <TextInput
            placeholder="Number 1"
            keyboardType="numeric"
            selectTextOnFocus={true}
            value={num1}
            onChangeText={e => setNum1(e)}
            style={{
              borderWidth: 1,
              width: '95%',
              alignSelf: 'flex-end',
              backgroundColor: 'white',
              color: 'black',
            }}
          />
        </View>

        <View style={{width: '10%'}}>
          <IconButton
            icon={'arrow-left-right-bold'}
            style={{
              position: 'absolute',
              width: '100%',
              height: '50%',
              margin: 'auto',
              marginTop: '15%',
            }}
            onPress={switchNumsAndUnits}
          />
        </View>

        <View style={{width: '45%'}}>
          <TextInput
            editable={false}
            placeholder="Number 2"
            keyboardType="numeric"
            value={num2}
            onChangeText={e => setNum2(e)}
            style={{
              borderWidth: 1,
              width: '95%',
              alignSelf: 'flex-start',
              color: 'black',
              backgroundColor: '#e1e1e0',
            }}
          />
        </View>
      </View>

      {/* line 2 for unit selections */}
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '45%'}}>
          <SelectDropdown
            buttonStyle={{width: '95%', alignSelf: 'flex-end'}}
            selectedRowStyle={{backgroundColor: '#20b1aa'}}
            selectedRowTextStyle={{color: 'white'}}
            data={allUnits}
            onSelect={selectedItem => {
              selectLeftItem(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultValue={selectedUnit1}
          />
        </View>
        <View style={{width: '10%'}} />
        <View style={{width: '45%'}}>
          <SelectDropdown
            buttonStyle={{width: '95%', alignSelf: 'flex-start'}}
            selectedRowStyle={{backgroundColor: '#20b1aa'}}
            selectedRowTextStyle={{color: 'white'}}
            data={rightUnitList}
            onSelect={selectedItem => {
              setSelectedUnit2(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultValue={selectedUnit2}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: '10%',
          marginBottom: 20,
          width: '98%',
          alignSelf: 'center',
        }}>
        <Button
          mode="contained"
          onPress={convert}
          style={{backgroundColor: '#20b1aa'}}>
          Convert
        </Button>
      </View>
    </ScrollView>
  );
};

export default App;
