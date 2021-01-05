import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Button, Modal, Alert } from 'react-native';
import { Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { postClient } from '../redux/actions'

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {			
			name: "",
			lastname: "",
			birthdate: "",
			age: 0,
			modalTitle: "Alerta",
			modalText: "",
			showModal: false,
			showDate: false
		}
	}

	static navigationOptions = {
		title: 'Registrar Cliente',
	};

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	handleClick() {		
		if (this.state.name.trim() == "") {			
			alert("Ingrese su Nombre")
			return
		}			
		if (this.state.lastname.trim() == "") {
			alert("Ingrese su Apellido")
			return
		}
		if (this.state.birthdate == "") {
			alert("Ingrese su Fecha de Nacimiento")
			return
		}

		let message = `Nombre : ${this.state.name}`
		message += `\nApellido : ${this.state.lastname}`
		message += `\nNacimiento : ${this.state.birthdate}`
		message += `\nEdad : ${this.state.age}`
		Alert.alert("Confirma que los datos son correctos?", message,
			[
				{ text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel' },
				{
					text: 'OK', onPress: async () => {
						let client = {
							name: this.state.name,
							lastname: this.state.lastname,
							birthdate: this.state.birthdate,
							age: this.state.age
						}
						let result = await postClient(client)
						if (result.status) {
							alert(`El cliente ${client.name} ${client.lastname} fue registrado correctamente`)										
						} else {
							alert(`Hubo un error al registrar el cliente: ${result.message}`)											
						}
						this.resetForm()
					}
				}
			],
			{ cancelable: false }
		)
	}

	resetForm() {
		this.setState({
			name: "",
			lastname: "",
			birthdate: "",
			age: 0,
			showDate: false,
			showModal: false			
		});
	}

	render() {
		return (
			<Animatable.View useNativeDriver={true} animation="zoomIn" duration={2000} delay={1000}>
				<ScrollView>
					<View style={styles.formRow}>						
						<Input
							placeholder="Nombre"
							leftIcon={{ type: 'font-awesome', name: 'user-o' }}
							onChangeText={(value) => this.setState({ name: value })}
							value={this.state.name}
							containerStyle={styles.formInput}
						/>
					</View>
					<View style={styles.formRow}>						
						<Input
							placeholder="Apellido"
							leftIcon={{ type: 'font-awesome', name: 'user-o' }}
							onChangeText={(value) => this.setState({ lastname: value })}
							value={this.state.lastname}
							containerStyle={styles.formInput}
						/>
					</View>
					<View style={styles.formRow}>						
						<Button onPress={()=>this.setState({showDate:true})} title={this.state.birthdate.length > 0 ? `Nacimiento : ${this.state.birthdate}` : "Seleccionar Fecha Nacimiento"} />
						{this.state.showDate && <DateTimePicker							
							value={new Date()}							
							mode="date"
							maximumDate={new Date()}							
							minimumDate={new Date(1930,1,1)}
							onChange={(event, date) => {
								if (date != null) {		
									let formatted = date.toISOString().slice(0, 10)
									let age = new Date().getUTCFullYear() - date.getUTCFullYear()										
									this.setState({ birthdate: formatted, showDate: false, age: age })
								}								
							}}
						/>}
					</View>
					<View style={styles.formRow}>						
						<Input
							placeholder={this.state.age > 0 ? `${this.state.age} Años` : "Edad"}
							leftIcon={{ type: 'font-awesome', name: 'user-o' }}
							disabled={true}
							value={this.state.age}
							containerStyle={styles.formInput}
						/>
					</View>				
					<View style={styles.formRow}>
						<Button
							onPress={() => this.handleClick()}
							title="Registrar Cliente"
							color="#512DA8"
							accessibilityLabel="Registrar Cliente"
						/>
					</View>
					<Modal animationType={"slide"} transparent={false}
						visible={this.state.showModal}
						onDismiss={() => this.toggleModal()}
						onRequestClose={() => this.toggleModal()}>
						<View style={styles.modal}>
							<Text style={styles.modalTitle}>{this.state.modalTitle}</Text>
							<Text style={styles.modalText}>{this.state.modalText}</Text>							
							<Button
								onPress={() => { this.toggleModal(); this.resetForm(); }}
								color="#512DA8"
								title="Close"
							/>
						</View>
					</Modal>
				</ScrollView>
			</Animatable.View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: "center",
		padding: 20
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	image: {
		margin: 10,
		width: 80,
		height: 60
	},
	formRow: {
		paddingHorizontal: 15,
		paddingVertical: 4
	},
	formCheckbox: {
		margin: 10,
		backgroundColor: null
	},
	formButton: {
		margin: 10
	},
	button: {
		margin: 5,
		backgroundColor: '#9575CD'
	},
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20
	},
	modalText: { 
		fontSize: 18,
		marginVertical: 20,
		paddingHorizontal: 10
	}
});

export default Main
