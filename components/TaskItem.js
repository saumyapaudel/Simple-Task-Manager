import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from "expo-checkbox";

const TaskItem = (props) => {
    const [markAsComplete, setMarkedAsComplete] = useState(false); // Track checkbox state for task completion, default unchecked
    return (
        <View style ={styles.taskItem}>
            <CheckBox style = {styles.checkbox} value={markAsComplete} onValueChange={setMarkedAsComplete} />
            <Text style = {[styles.description, markAsComplete&& {
                textDecorationLine: 'line-through', // Strikethrough when task is marked complete
                color: '#333333',
                opacity: 0.6}
        ]}>{props.text}</Text>
        <TouchableOpacity onPress={() => props.deleteTask(props.index)}>
            <Text style={styles.delete}>Remove</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: '#a8e6cf',
        padding: 10,
        borderRadius: 20,
        margin: 10,
        flexDirection: "row",
        alignContent: 'center',

    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 15,
        marginRight: 10,

    },
    description: {
        flex: 1,
        maxWidth: '80%',
        fontWeight: '500',
        fontSize: 16,
    },
    delete: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 15,
        borderColor: "#CD5C5C",
        borderWidth: 4,
        fontSize: 12,
        color: "#CD5C5C",
        fontWeight: "bold",
        textAlign: "center",
        alignContent: 'center'
    },
})

export default TaskItem;