import React, { useLayoutEffect, useState } from "react";
import { RefreshControl, FlatList, View } from "react-native";
import NewsCard from "../../Components/NewsCard";
import { List, Headline } from "react-native-paper";
import Axios from "axios";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


let count = 0
const News = () => {
	const [news, setNews] = useState(Array);
	const [loading, setLoading] = useState(true);
	const boot = () => {
		let fetchURL =
			"http://newsapi.org/v2/top-headlines?pageSize=30&language=en&q=corona&apiKey=da85d727b8bf46f38fb3fc38b9fb31a4";
		Axios.get(fetchURL)
			.then(res => {
				setNews(res.data.articles);
				setLoading(false);
			})
			.catch(err => console.log(err));
	};

	useLayoutEffect(() => {
		!news.length && boot();
	}, []);

	return (
		<View style={{ backgroundColor: '#161b1d', flex: 1 }}>
		<View style={{ alignItems: 'center', marginBottom: wp(3), marginTop: wp(2), backgroundColor: '#161b1d' }}>
			<Headline style={{color: 'white', margin: 0 }}>Top Headlines</Headline>
		</View>
			<FlatList
				data={news}
				renderItem={renderItem}
				keyExtractor={item =>
					item.url.toString() + item.publishedAt.toString() + count++
				}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={boot} />
				}
				// Performance settings
				removeClippedSubviews={true} // Unmount components when outside of window
				initialNumToRender={1} // Reduce initial render amount
				// maxToRenderPerBatch={1} // Reduce number in each render batch
				maxToRenderPerBatch={10} // Increase time between renders
				// windowSize={3} // Reduce the window size
				// updateCellsBatchingPeriod={500}
			/>
		</View>
	);
};

export default News;

const renderItem = ({ item }) => {
	return (
		<NewsCard
			key={item.url}
			title={item.title}
			imageURL={item.urlToImage}
			description={item.description}
			publishedAt={item.publishedAt}
			url={item.url}
		/>
	);
};
