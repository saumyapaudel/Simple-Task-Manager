import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import TaskItem from './components/TaskItem';
import { KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';

export default function App() {
  const [taskItem, setTaskItem] = useState();
  const [taskItemsArr, setTaskItemsArr] = useState([]);

  const addTask = () => {
    if(taskItem != ''){
      setTaskItemsArr([...taskItemsArr, taskItem]);
      setTaskItem('');
      Keyboard.dismiss();
    }
  }
  
  const deleteTask = (index) => {
    const copy = [...taskItemsArr];
    copy.splice(index, 1);
    setTaskItemsArr(copy);
  };

  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>SIMPLE TASK MANAGER</Text>

          <View style={styles.tasks}>
            {
              taskItemsArr.map((item, index) => (
                <TaskItem 
                  key={index} 
                  text={item} 
                  index={index} 
                  deleteTask={deleteTask} 
                />
              ))
            }
          </View>

        </View>
    
    <KeyboardAvoidingView 
    behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.inputTaskWrapper}
    >
      <TextInput style={styles.taskInput} placeholder= 'E.g.: Do Laundry, Walk the Dog, etc...' onChangeText={text => setTaskItem(text)} value={taskItem}/>
      <TouchableOpacity onPress={() => addTask()}>
        <View style= {styles.addTaskWrapper}>
          <Text style = {styles.addIcon}> + </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f2',

  },
  wrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '	#1e2a38',
  },
  tasks: {
    marginTop: 20,
  },
  inputTaskWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 60,
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f7f2', 
  },
  taskInput: {
    flex: 1, 
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  addTaskWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#6bb89e',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: '#fff',
    fontSize: 24,
  },
            
});
