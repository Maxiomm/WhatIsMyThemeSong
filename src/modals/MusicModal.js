import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Audio } from "expo-av";
// import ConfettiCannon from "react-native-confetti-cannon";``
import Animated, { BounceIn } from "react-native-reanimated";

import { Entypo } from "@expo/vector-icons";

export default function MusicModal({ isVisible, onClose, songInfo }) {
  const { title, artist, cover, previewUrl, spotifyUrl } = songInfo;

  const handleSpotifyPress = () => {
    Linking.openURL(spotifyUrl);
  };

  const playPreview = async () => {
    if (!previewUrl) {
      console.log("No preview available: ", songInfo);
      return; // Si aucun extrait n'est disponible, ne rien jouer
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: previewUrl },
      { shouldPlay: true }
    );

    await sound.playAsync();

    // Nettoyer le son lorsqu'il est terminé
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  useEffect(() => {
    if (isVisible) {
      playPreview();
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={styles.container}
          entering={BounceIn.duration(800)}
        >
          {/* <ConfettiCannon
            count={50}
            origin={{ x: 150, y: 0 }}
            explosionSpeed={500}
            fadeOut={true}
            fallSpeed={3500}
          /> */}

          {/* Image de la cover */}
          {cover ? (
            <Image source={{ uri: cover }} style={styles.cover} />
          ) : (
            <Text style={styles.noCover}>Pas de cover disponible</Text>
          )}

          {/* Titre et artiste */}
          <Text style={styles.title}>{title || "Titre inconnu"}</Text>
          <Text style={styles.artist}>{artist || "Artiste inconnu"}</Text>

          {/* Bouton Spotify */}
          {spotifyUrl && (
            <TouchableOpacity
              style={styles.spotifyButton}
              onPress={handleSpotifyPress}
            >
              <Text style={styles.spotifyText}>Écouter sur Spotify</Text>
            </TouchableOpacity>
          )}

          {/* Bouton pour fermer la modale */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Entypo name="cross" size={32} color="#6200EE" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },

  cover: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  artist: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },

  spotifyButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },

  spotifyText: {
    color: "#fff",
    fontWeight: "bold",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
