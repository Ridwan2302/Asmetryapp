import * as ImagePicker from 'expo-image-picker';

/** Launches the photo library and returns the picked image's local URI, or null if canceled/denied. */
export async function pickImageFromLibrary(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.85,
  });
  if (result.canceled || !result.assets?.length) return null;
  return result.assets[0].uri;
}
