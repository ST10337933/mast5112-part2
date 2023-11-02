import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface BookDetails {
title: string;
author: string;
genre: string;
pages: number;
}

const HomePage = () => {
const [bookTitle, setBookTitle] = useState('');
const [bookAuthor, setBookAuthor] = useState('');
const [bookGenre, setBookGenre] = useState('Select Genre');
const [bookPages, setBookPages] = useState('');

const [lastBookDetails, setLastBookDetails] = useState<BookDetails | null>(
null,
);
const [totalPagesRead, setTotalPagesRead] = useState(0);
const [numberOfBooks, setNumberOfBooks] = useState(0);

const predefinedGenres = [
'Select Genre',
'Fantasy',
'Mystery',
'Romance',
'Horror',
'Fiction',
'Non-Fiction',
'Action',
'Sci-Fi',
];

const addBook = () => {
if (!isFormValid()) {
return;
}

const newBook: BookDetails = {
title: bookTitle,
author: bookAuthor,
genre: bookGenre,
pages: parseInt(bookPages, 10),
};

setLastBookDetails(newBook);
setTotalPagesRead(totalPagesRead + newBook.pages);
setNumberOfBooks(numberOfBooks + 1);

clearForm();
};

const isFormValid = () => {
if (
!bookTitle ||
!bookAuthor ||
bookGenre === 'Select Genre' ||
!bookPages
) {
Alert.alert('Error', 'Kindly ensure all the fields above are filled in');
return false;
}
return true;
};

const clearForm = () => {
setBookTitle('');
setBookAuthor('');
setBookGenre('Select Genre');
setBookPages('');
};

return (
<View style={styles.container}>
<Text style={styles.title}>BOOKWORM</Text>
<TextInput
style={styles.input}
placeholder="Title"
value={bookTitle}
onChangeText={text => setBookTitle(text)}
/>
<TextInput
style={styles.input}
placeholder="Author"
value={bookAuthor}
onChangeText={text => setBookAuthor(text)}
/>
<Picker
style={styles.input}
selectedValue={bookGenre}
onValueChange={itemValue => setBookGenre(itemValue)}>
{predefinedGenres.map((genre, index) => (
<Picker.Item key={index} label={genre} value={genre} />
))}
</Picker>
<TextInput
style={styles.input}
placeholder="Number of Pages"
value={bookPages}
onChangeText={text => setBookPages(text)}
keyboardType="numeric"
/>

<Button title="Add Book" onPress={addBook}/>

{lastBookDetails && (
<View style={styles.statisticsContainer}>
<Text style={styles.statistics}>Last Book Read:</Text>
<Text style={styles.statistics}>Title: {lastBookDetails.title}</Text>
<Text style={styles.statistics}>Author: {lastBookDetails.author}</Text>
<Text style={styles.statistics}>Genre: {lastBookDetails.genre}</Text>
<Text style={styles.statistics}>Pages: {lastBookDetails.pages}</Text>
</View>
)}
<View style={styles.statisticsContainer}>

<Text style={styles.statistics}>Total Number of Pages Read: {totalPagesRead}</Text>
<Text style={styles.statistics}>
Average Number of Pages Read:{' '}
{numberOfBooks > 0 ? totalPagesRead / numberOfBooks : 0}
</Text>
</View>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#6495ED', 
    opacity:50,
  },
title: {
  fontSize: 60,
  fontFamily: 'lucida grande',
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#0000cd',
},
input: {
  height: 80,
  fontSize: 25,
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: 'black', 
  borderRadius: 4,
  marginBottom: 12,
  paddingLeft: 8,
  color:'black',
},
bookInfoContainer: {
marginTop: 20,
fontSize:25,
color:'black',
},
statisticsContainer:{
  backgroundColor: '#ffffff',
  borderRadius: 4,
  marginBottom: 2,
  elevation: 2, 
  marginTop: 26,
  borderWidth:1,
  paddingLeft:8,
},
statistics: {
marginTop: 20,
fontSize:22,
color:'black',
},
lastBookDeatils:{
  fontSize:25,
},
bookGenre:{
  fontSize:25,
},
genre:{
  height: 80,
  fontSize: 25,
  backgroundColor: '#1e90ff',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 4,
  marginBottom: 12,
  paddingLeft: 8,
  color:'#ffffff',
},
button: {
  marginTop: 10,
  color: '#000000',
  padding: 10,
  paddingLeft: 15,
  paddingRight:15,
},
text:{
  fontSize:22,
},
});

export default HomePage;