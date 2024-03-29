import { useState } from "react";
import {
	Alert,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState("");
	const { width, height } = useWindowDimensions();

	function numberInputHandler(inputText) {
		setEnteredNumber(inputText);
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number between 1 and 99.",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}
		onPickNumber(chosenNumber);
	}

	function resetInputHandler() {
		setEnteredNumber("");
	}

	const marginTop = height < 500 ? 10 : 100;

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView style={styles.screen} behavior="position">
				<View style={[styles.rootContainer, { marginTop }]}>
					<Title>Guess my number!</Title>
					<Card>
						<InstructionText>Enter a number</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType="number-pad"
							autoCapitalize="none"
							autoCorrect={false}
							value={enteredNumber}
							onChangeText={numberInputHandler}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

export default StartGameScreen;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		alignItems: "center",
	},
	numberInput: {
		height: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: "bold",
		width: 50,
		textAlign: "center",
		marginBottom: 16,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
