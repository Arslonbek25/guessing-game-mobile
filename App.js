import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function App() {
	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	const [userNumber, setUserNumber] = useState();
	const [rounds, setRounds] = useState(0);
	const [gameOver, setGameOver] = useState(false);

	function pickedNumberHnadler(number) {
		setUserNumber(number);
	}

	function gameOverHandler(rounds) {
		setRounds(rounds);
		setGameOver(true);
	}

	function restartGameHandler() {
		setGameOver(false);
		setRounds(0);
		setUserNumber(null);
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHnadler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameOver) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={rounds}
				onRestart={restartGameHandler}
			/>
		);
	}

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient
				colors={[Colors.primary700, Colors.accent500]}
				style={styles.rootScreen}>
				<ImageBackground
					source={require("./assets/image/background.png")}
					resizeMode="cover"
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.1,
	},
});
