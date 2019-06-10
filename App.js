/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Share from 'react-native-share';
import FileSystem from 'react-native-fs';

const content = "Header1,Header2\nContent1,Content2";

export default class App extends Component {

  fileUsesTxtAsEnding = async () => {
    const path = FileSystem.DocumentDirectoryPath + "/MyFile.csv";
    await FileSystem.writeFile(path,content);
    await Share.open({
      url: path,
      // type: "text/csv" // Makes no difference
    });
    await FileSystem.unlink(path);
  }

  shareWithBase64 = async () => {
    const path = FileSystem.DocumentDirectoryPath + "/MyFile.csv";
    await FileSystem.writeFile(path,content);
    const fileContentBase64 = FileSystem.readFile(path, "base64");
    const dataUri = `data:text/csv;base64,${fileContentBase64}`;
    await Share.open({
      url: dataUri,
      //type: "text/csv" // Makes no difference
    });
    await FileSystem.unlink(path);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

        <Text style={styles.instructions}>Fails to interpret extension (shows up as .txt) and creates a new file with url as content</Text>
        <Button onPress={this.fileUsesTxtAsEnding} title="Share file from filepath" />

        <Text style={styles.instructions}>Fails to interpret extension (shows up as .null)</Text>
        <Button onPress={this.shareWithBase64} title="Share using base64 data url" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
