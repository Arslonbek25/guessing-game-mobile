import {
	Image,
	StyleSheet,
	View,
	Text,
	Dimensions,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function GameOverScreen({
	roundsNumber,
	userNumber,
	onRestart,
}) {
	const [name, setName] = useState("");
	const { width, height } = useWindowDimensions();

	let imageSize = 300;
	console.log(width, height);
	if (width < 300) {
		imageSize = 150;
	}

	if (height < 500) {
		imageSize = 80;
	}

	const imageStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.rootContainer}>
				<Title>Game over</Title>
				<View style={[styles.imageConainer, imageStyle]}>
					<Image
						style={styles.image}
						source={require("../assets/image/success.png")}
					/>
				</View>
				<Text style={styles.summaryText}>
					Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
					rounds to guess the number{" "}
					<Text style={styles.highlight}>{userNumber}</Text>
				</Text>
				<PrimaryButton onPress={onRestart}>Play again</PrimaryButton>
			</View>
		</ScrollView>
	);
}

// const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	imageConainer: {
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: "hidden",
		margin: 36,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	summaryText: {
		fontFamily: "open-sans",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 20,
	},
	highlight: {
		fontFamily: "open-sans-bold",
		color: Colors.primary500,
	},
});
