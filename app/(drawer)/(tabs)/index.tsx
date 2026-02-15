import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useHomeViewModel } from '@/src/presentation/hooks/useHomeViewModel';
import { MediaCard } from '@/src/presentation/components/MediaCard';

export default function HomeScreen() {
  const { mediaList, isLoading, isRefreshing, onRefresh, handleMediaPress } = useHomeViewModel();
  const theme = useTheme();

  if (isLoading && !isRefreshing && mediaList.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={mediaList}
        renderItem={({ item }) => (
          <MediaCard media={item} onPress={handleMediaPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 8,
  },
});
