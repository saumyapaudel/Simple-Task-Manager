import React, {useState} from 'react';
import { Platform, StyleSheet, Text, Touchable, TouchableOpacity, View, ScrollView } from 'react-native';
import TaskItem from './components/TaskItem';
import { KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';

export default function App() {
  const [taskItem, setTaskItem] = useState();
  const [taskItemsArr, setTaskItemsArr] = useState([]);
  
  // Adds a new task if input is not empty, then clears input and dismisses keyboard
  const addTask = () => {
    if(taskItem != ''){
      setTaskItemsArr([...taskItemsArr, taskItem]);
      setTaskItem('');
      Keyboard.dismiss();
    }
  }
  // Deletes a task by creating a copy, removing the item, and updating state
  const deleteTask = (index) => {
    const copy = [...taskItemsArr];
    copy.splice(index, 1);
    setTaskItemsArr(copy);
  };

  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>SIMPLE TASK MANAGER</Text>

          <ScrollView 
          style={styles.tasksContainer}
          contentContainerStyle={styles.tasksContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tasks}>
            {
              // Render each task with a unique key and pass delete function
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
          
          {/* Bottom padding to ensure not hidden behind input*/}
          <View style={styles.bottomPadding} />
        </ScrollView>

        </View>
    {/* Moves input field above keyboard on iOS and Android */}
    <KeyboardAvoidingView 
    behavior = 'padding'
    style={styles.inputTaskWrapper}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TextInput 
      style={styles.taskInput} 
      placeholder= 'Enter a task' 
      onChangeText={text => setTaskItem(text)} 
      value={taskItem}/>
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
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '	#1e2a38',
  },
  bottomPadding: {
    height: 100, 
  },
  inputTaskWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 20, 
    paddingVertical: 20, 
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
