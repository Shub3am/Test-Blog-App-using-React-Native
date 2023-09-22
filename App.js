import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-web";

const Item = ({ post }) => {
  console.log(post);
  const s = StyleSheet.create({
    container: {
      margin: "1em",
    },
    post: {
      color: "white",
      display: "flex",
      flexWrap: "wrap",
    },
  });
  return (
    <View style={s.container}>
      <Text style={s.post}>Title: {post.title}</Text>
      <Text style={s.post}>Post: {post.body}</Text>
    </View>
  );
};

export default function App() {
  const [Data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const getBlogs = async () => {
    let posts = await fetch("https://dummyjson.com/posts?limit=10").then(
      (res) => {
        return res.json();
      }
    );
    await setData(posts.posts);
    await setLoading(false);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  if (!loading) {
    return (
      <View style={mera.container}>
        <View style={mera.header}>
          <Text style={mera.header}>Welcome to my Blog!</Text>
        </View>
        <View style={mera.blog}>
          <FlatList
            data={Data}
            renderItem={({ item }) => <Item post={item} />}
          ></FlatList>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={mera.container}>
        <ActivityIndicator />
        <Text>Rendered</Text>
      </View>
    );
  }
}

const mera = StyleSheet.create({
  header: {
    top: 0,
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: 30,
    backgroundColor: "red",
    padding: 10,
    margin: 0,
  },
  container: {
    width: "100%",
    padding: 0,
    backgroundColor: "black",
  },
  blog: {
    width: "80%",
    display: "flex",
    margin: "auto",
  },
  mainText: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: 50,
  },
});
