import * as React from "react";
import {
	TouchableOpacity,
	StyleSheet,
	Linking,
	View,
	Text
} from "react-native";
import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import TimeAgo from "react-native-timeago";
import FastImage from "react-native-fast-image";
import { createImageProgress } from "react-native-image-progress";

const ImageWithProgress = createImageProgress(FastImage);

const Image = ({ url }) => (
	<ImageWithProgress
		style={{ width: wp(35), height: wp(40) }}
		imageStyle={{ borderRadius: 20, margin: wp(3), width: wp(30), height: wp(33) }}
		source={{
			uri: url,
			priority: FastImage.priority.normal,
			cache: FastImage.cacheControl.web
		}}
	/>
);

let noImageURL =
	"http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png";
class NewsCard extends React.PureComponent{

	handleOpenURL = () => {
		Linking.canOpenURL(this.props.url)
			.then(supported => {
				if (!supported) {
					Alert.alert(
						"Oops!",
						`Opening link may not be supported on your device.`,
						[{ text: "OK" }],
						{ cancelable: false }
					);
				} else {
					return Linking.openURL(this.props.url);
				}
			})
			.catch(err => console.error("An error occurred", err));
	};

	render() {

		const { title, imageURL, description, publishedAt } = this.props
			 return (
				<>
					<TouchableOpacity activeOpacity={0.9} onPress={this.handleOpenURL}>
						<View style={styles.Card}>
							<Image url={imageURL ? imageURL : noImageURL} />
							<View style={{ flex: 1, padding: wp(2) }}>
								<Text style={{ color: "#fff", fontSize: wp(4) }}>
									{title}
								</Text>
								<TimeAgo style={{ color: "gray" }} time={publishedAt} />
								<Text style={{ color: "gray" }}>
									{description && description.slice(0, 100) + "..."}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</>
			);
	}
};
NewsCard.defaultProps = {
	title: "News Title",
	imageURL: "https://picsum.photos/700",
	description: "news Description"
};

const styles = StyleSheet.create({
	Card: {
		margin: wp(3),
		borderColor: "gray",
		borderWidth: 0.8,
		backgroundColor: "#1b232f",
		borderRadius: 20,
		flexDirection: "row"
	}
});

export default NewsCard;
