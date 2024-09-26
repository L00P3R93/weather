import React, { useState, useEffect} from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	ViewStyle,
	ImageStyle,
	TextStyle
} from 'react-native';
import { fetchWeather } from './util/api';
import getImageForWeather from './util/getImageForWeather';
import SearchInput from './components/SearchInput';
import { weather_type, fetchWeatherResponse } from './util/types';

const App: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [location, setLocation] = useState<string>("");
	const [temperature, setTemperature] = useState<number>(0);
	const [weather, setWeather] = useState<weather_type>("Clear");

	useEffect(() => {

	}, []);

	const handleUpdateLocation = async (city: string) => {
		if(!city) return;
		setLoading(true);
		try{
			const { location, weather, temperature } : fetchWeatherResponse = await fetchWeather(city);

			setLocation(location);
			setWeather(weather);
			setTemperature(temperature);
			setError(false);
		}catch(e){
			setError(true);
		}finally{
			setLoading(false);
		}

	}

	return (
		<TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<StatusBar barStyle='light-content' />
				<ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer} imageStyle={styles.image}>
					<View style={styles.detailsContainer}>
						<ActivityIndicator animating={loading} color='white' size='large' />
						{!loading && (
							<View>
								{error && (
									<Text style={[styles.smallText, styles.textStyle]}>
										Could not load weather, please try a different city
									</Text>
								)}

								{!error && (
									<View>
										<Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
										<Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
										<Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
									</View>
								)}
								<SearchInput placeholder="Search any city" onSubmit={handleUpdateLocation} />
							</View>
						)}
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
};

interface Style {
	container: ViewStyle;
	imageContainer: ViewStyle;
	image: ImageStyle;
	detailsContainer: ViewStyle;
	textStyle: TextStyle;
	largeText: TextStyle;
	smallText: TextStyle;
}

const styles = StyleSheet.create<Style>({
	container:{
		flex: 1,
		backgroundColor: "#34495E",
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover",
	},
	detailsContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
		paddingHorizontal: 20,
	},
	textStyle: {
		textAlign: "center",
		fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
		color: "white",
	},
	largeText: {
		fontSize: 44
	},
	smallText: {
		fontSize: 18
	},
})

export default App;