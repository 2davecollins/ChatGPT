import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios';

const ChatGPT = () => {

    const [data, setData] = useState([]);
    const apikey ='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';
    const apiUri ='https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput, setTextInput ] = useState('');
    const handleSend = async () =>{
        const prompt = textInput        
        const response = await axios.post(apiUri, {
            prompt:  prompt,
            max_tokens:1024,
            temperature: 0.5

        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${apikey}`
            }
        });
        const text = response.data.choices[0].text;
        setData ([...data,{type: 'user', 'text': textInput},{type: 'bot', 'text':text}] );
        setTextInput('');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ai ChatBot</Text>
      <FlatList 
            data={data}
            keyExtractor ={(item,index) => index.toString()}
            style = {styles.body}
            renderItem= {({item})=> (
                <View style={{ flexDirection:'row', padding:10}}>
                    <Text style={{fontWeight:'bold', color:item.type ==='user' ? 'green': 'red' }}>{item.type === 'user' ? 'Question :': 'bot : '}</Text>
                    <Text styles={styles.bot}>{item.text}</Text>
                </View>
            )}
        />
      <TextInput 
        style={styles.input}
        value={textInput}
        onChangeText = {text => setTextInput(text)}
        placeholder = "Ask me anything?"
      />
      <TouchableOpacity 
        style = {styles.button}
        onPress={handleSend}        
        >
            <Text style={styles.buttonText}>Ask now! </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatGPT


const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'#fffcc9',
        alignItems:'center',
        padding:5,
       
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:70,
    },
    body:{
        flex:1,
        backgroundColor:'#fffcc9',
        width:'80%',
        margin:10,
    },
    bot:{
        fontSize:20
    },
    input:{
        height:50,
        minWidth:'90%',
        borderWidth:5,
        borderColor:'black',       
        padding:10,              
        borderRadius:5,
        fontSize:20,
    },
    button:{
        minWidth:'75%',
        backgroundColor:'gold',       
        borderRadius:20, 
        padding:10,
        marginTop:5,       
        
    },
    buttonText:{
        fontSize:25,
        fontWeight:'bold',
        color:'blue',
        textAlign:'center'
    }
});