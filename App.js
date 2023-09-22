import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Item = ({ post }) => {
  const s = StyleSheet.create({
    container: {},
    post: {
      color: "white",
      display: "flex",
      flexWrap: "wrap",
    },
  });
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.post}>Title: {post.title}</Text>
      <Text style={s.post}>Post: {post.body}</Text>
    </SafeAreaView>
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
      <SafeAreaProvider>
        <SafeAreaView style={mera.container}>
          <SafeAreaView style={mera.header}>
            <Text style={mera.headerText}>Welcome to my Blog!</Text>
          </SafeAreaView>
          <SafeAreaView style={mera.blog}>
            <FlatList
              style={mera.flat}
              data={Data}
              renderItem={({ item }) => <Item post={item} />}
            ></FlatList>
          </SafeAreaView>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <View style={mera.container}>
          <ActivityIndicator />
          <Text>Rendered</Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const mera = StyleSheet.create({
  header: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",

    backgroundColor: "red",
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: 35,
  },
  container: {
    backgroundColor: "black",
  },
  blog: {
    display: "flex",
    margin: "0",
    padding: "0",
  },
  flat: {},
  mainText: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: 50,
  },
});
