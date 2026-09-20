import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
export default function Carteirinha({ nome, rm, dataNascimento, curso, imagem, onEditar }) {
 return (
<View style={styles.carteira}>
<Text style={styles.header}>CARTEIRINHA</Text>
<Image source={{ uri: imagem }} style={styles.imagemCarteira} />
<Text style={styles.nome}>{nome}</Text>
<Text style={styles.curso}>{curso}</Text>
<View style={styles.infoGroup}>
<Text style={styles.infoLabel}>RM:</Text>
<Text style={styles.infoTexto}>{rm}</Text>
</View>
<View style={styles.infoGroup}>
<Text style={styles.infoLabel}>Nascimento:</Text>
<Text style={styles.infoTexto}>{dataNascimento}</Text>
</View>
<View style={styles.espacoBotao}>
<Button title="Editar Dados" onPress={onEditar} color="#dc2626" />
</View>
</View>
 );
}
const styles = StyleSheet.create({
 carteira: {
   width: '100%',
   maxWidth: 320,
   backgroundColor: '#ffffff',
   padding: 20,
   borderRadius: 16,
   alignItems: 'center',
   borderWidth: 1,
   borderColor: '#cbd5e1',
 },
 header: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#2563eb',
   marginBottom: 15,
 },
 imagemCarteira: {
   width: 120,
   height: 120,
   borderRadius: 60,
   marginBottom: 15,
   borderWidth: 2,
   borderColor: '#2563eb',
 },
 nome: {
   fontSize: 20,
   fontWeight: 'bold',
   textAlign: 'center',
 },
 curso: {
   fontSize: 14,
   color: '#64748b',
   marginBottom: 15,
   textAlign: 'center',
 },
 infoGroup: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   width: '100%',
   marginVertical: 4,
   paddingHorizontal: 10,
 },
 infoLabel: {
   fontWeight: 'bold',
   color: '#475569',
 },
 infoTexto: {
   color: '#0f172a',
 },
 espacoBotao: {
   marginTop: 20,
 },
});