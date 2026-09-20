import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 StyleSheet,
 Alert,
 TextInput,
 ScrollView,
 SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Carteira from './components/Carteirinha';
export default function App() {
 const [tela, setTela] = useState('home'); 
 const [nome, setNome] = useState('');
 const [rm, setRm] = useState('');
 const [dataNascimento, setDataNascimento] = useState('');
 const [curso, setCurso] = useState('Ds');
 const [imagem, setImagem] = useState(null);
 const escolherImagem = async () => {
   const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
   if (!permissao.granted) {
     Alert.alert(
       'Permissão necessária',
       'A permissão para acessar os arquivos/galeria é necessária!'
     );
     return;
   }
   const resultado = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ['images'],
     allowsEditing: true,
     aspect: [1, 1],
     quality: 0.8,
   });
   if (!resultado.canceled) {
     setImagem(resultado.assets[0].uri);
   }
 };
 const tirarFoto = async () => {
   const permissao = await ImagePicker.requestCameraPermissionsAsync();
   if (!permissao.granted) {
     Alert.alert(
       'Permissão necessária',
       'A permissão para acessar a câmera é necessária!'
     );
     return;
   }
   const resultado = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [1, 1],
     quality: 0.8,
   });
   if (!resultado.canceled) {
     setImagem(resultado.assets[0].uri);
   }
 };
 const gerarCarteira = () => {
   if (!nome.trim() || !rm.trim() || !dataNascimento.trim() || !curso.trim() || !imagem) {
     Alert.alert('Atenção', 'Por favor, preencha todos os campos e adicione uma foto!');
     return;
   }
   setTela('carteira');
 };
 return (
<SafeAreaView style={styles.container}>
<ScrollView contentContainerStyle={styles.scrollContent}>
       {tela === 'home' && (
<View style={styles.homeCard}>
<Text style={styles.homeTitle}>Nsa Aluno</Text>
<TouchableOpacity
             style={styles.button}
             onPress={() => setTela('form')}
             activeOpacity={0.8}
>
<Text style={styles.buttonText}>Iniciar Cadastro</Text>
</TouchableOpacity>
</View>
       )}
       {tela === 'form' && (
<>
<View style={styles.header}>
<Text style={styles.title}>Carteira Digital</Text>
<Text style={styles.subtitle}>Preencha os dados abaixo</Text>
</View>
<View style={styles.formCard}>
<Text style={styles.label}>Nome Completo</Text>
<TextInput
               style={styles.input}
               placeholder="Ex: João da Silva"
               value={nome}
               onChangeText={setNome}
             />
<Text style={styles.label}>RM (Registro de Matrícula)</Text>
<TextInput
               style={styles.input}
               placeholder="Ex: 25092"
               keyboardType="numeric"
               value={rm}
               onChangeText={setRm}
             />
<Text style={styles.label}>Data de Nascimento</Text>
<TextInput
               style={styles.input}
               placeholder="Ex: DD/MM/AAAA"
               value={dataNascimento}
               onChangeText={setDataNascimento}
             />
<Text style={styles.label}>Curso</Text>
<View style={styles.pickerContainer}>
<Picker
                 selectedValue={curso}
                 onValueChange={(itemValue) => setCurso(itemValue)}
                 style={styles.picker}
>
<Picker.Item label="Ds" value="Ds" />
<Picker.Item label="Mad" value="Mad" />
<Picker.Item label="Mam" value="Mam" />
<Picker.Item label="Mim" value="Mim" />
<Picker.Item label="Mad-n" value="Mad-n" />
<Picker.Item label="Far" value="Far" />
</Picker>
</View>
<Text style={styles.label}>Foto de Perfil</Text>
<View style={styles.imagePreviewContainer}>
               {imagem ? (
<Image source={{ uri: imagem }} style={styles.previewImage} />
               ) : (
<View style={styles.placeholderImage}>
<Text style={styles.placeholderText}>Sem Foto</Text>
</View>
               )}
</View>
<View style={styles.photoButtonsRow}>
<TouchableOpacity style={[styles.photoButton, styles.cameraButton]} onPress={tirarFoto}>
<Text style={styles.photoButtonText}>📷 Câmera</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.photoButton, styles.galleryButton]} onPress={escolherImagem}>
<Text style={styles.photoButtonText}>📁 Arquivos</Text>
</TouchableOpacity>
</View>
<TouchableOpacity style={styles.button} onPress={gerarCarteira} activeOpacity={0.8}>
<Text style={styles.buttonText}>Gerar Carteira</Text>
</TouchableOpacity>
</View>
</>
       )}
       {tela === 'carteira' && (
<Carteira
           nome={nome}
           rm={rm}
           dataNascimento={dataNascimento}
           curso={curso}
           imagem={imagem}
           onEditar={() => setTela('form')}
         />
       )}
</ScrollView>
</SafeAreaView>
 );
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F4F6F9',
 },
 scrollContent: {
   flexGrow: 1,
   alignItems: 'center',
   justifyContent: 'center',
   padding: 24,
 },
 homeCard: {
   backgroundColor: '#FFFFFF',
   borderRadius: 20,
   padding: 32,
   width: '100%',
   maxWidth: 400,
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.1,
   shadowRadius: 10,
   elevation: 4,
 },
 homeTitle: {
   fontSize: 26,
   fontWeight: '800',
   color: '#1E293B',
   marginBottom: 8,
   textAlign: 'center',
 },
 homeSubtitle: {
   fontSize: 15,
   color: '#64748B',
   textAlign: 'center',
   marginBottom: 24,
   lineHeight: 22,
 },
 header: {
   alignItems: 'center',
   marginBottom: 18,
 },
 title: {
   fontSize: 28,
   fontWeight: '800',
   color: '#1E293B',
   letterSpacing: -0.5,
 },
 subtitle: {
   fontSize: 14,
   color: '#64748B',
   marginTop: 4,
 },
 formCard: {
   backgroundColor: '#FFFFFF',
   borderRadius: 16,
   padding: 20,
   width: '100%',
   maxWidth: 520,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 8,
   elevation: 3,
 },
 label: {
   fontSize: 14,
   fontWeight: '600',
   color: '#334155',
   marginBottom: 6,
   marginTop: 10,
 },
 input: {
   backgroundColor: '#F8FAFC',
   borderWidth: 1,
   borderColor: '#E2E8F0',
   borderRadius: 10,
   paddingHorizontal: 14,
   paddingVertical: 10,
   fontSize: 15,
   color: '#0F172A',
 },
 pickerContainer: {
   backgroundColor: '#F8FAFC',
   borderWidth: 1,
   borderColor: '#E2E8F0',
   borderRadius: 10,
   overflow: 'hidden',
   justifyContent: 'center',
 },
 picker: {
   width: '100%',
   color: '#0F172A',
 },
 imagePreviewContainer: {
   alignItems: 'center',
   marginVertical: 12,
 },
 previewImage: {
   width: 100,
   height: 100,
   borderRadius: 50,
 },
 placeholderImage: {
   width: 100,
   height: 100,
   borderRadius: 50,
   backgroundColor: '#E2E8F0',
   alignItems: 'center',
   justifyContent: 'center',
 },
 placeholderText: {
   color: '#94A3B8',
   fontSize: 12,
 },
 photoButtonsRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 20,
   gap: 10,
 },
 photoButton: {
   flex: 1,
   paddingVertical: 12,
   borderRadius: 10,
   alignItems: 'center',
 },
 cameraButton: {
   backgroundColor: '#475569',
 },
 galleryButton: {
   backgroundColor: '#64748B',
 },
 photoButtonText: {
   color: '#FFFFFF',
   fontSize: 14,
   fontWeight: '600',
 },
 button: {
   backgroundColor: '#2563EB',
   paddingVertical: 16,
   paddingHorizontal: 32,
   borderRadius: 14,
   width: '100%',
   alignItems: 'center',
   shadowColor: '#2563EB',
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.3,
   shadowRadius: 8,
   elevation: 4,
   marginTop: 10,
 },
 buttonText: {
   color: '#FFFFFF',
   fontSize: 16,
   fontWeight: '700',
 },
});