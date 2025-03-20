import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, View } from "react-native";
import * as FileSystem from "expo-file-system";

import OpenAI from "openai";

import { OPENAI_API_KEY } from "@env";

import { useLoading } from "../contexts/LoadingContext";

import { getSongDetails } from "../utils/getSongDetails";

import MusicModal from "../modals/MusicModal";

// Initialisation de l'API avec la clé
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Analyse({ image, triggerConfetti }) {
  const { setLoading } = useLoading();

  const [isModalVisible, setModalVisible] = useState(false);
  const [songInfo, setSongInfo] = useState({});

  const handleThemeSong = async () => {
    if (!image) {
      Alert.alert(
        "Attention",
        "Veuillez d'abord ajouter une photo avant de découvrir votre chanson thème."
      );
      return;
    }

    setLoading(true);

    try {
      // Conversion de l'image en base64
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const prompt = `
        You are part of a feature in my mobile application. 
        This feature allows a user to send an image, click on a button, 
        and see the 'theme song' that corresponds to the image they sent.

        You can respond with any song, music, movie score, comic book soundtrack, 
        manga soundtrack, meme songs... whether it has lyrics or is instrumental, 
        and from any era or language.

        Try to be creative and think outside of only english.

        You can be serious, unserious, funny, or anything in between even trolling if you want.

        Try to adapt your response based on what you see.

        Avoid overly obvious or cliché choices such as "Happy" by Pharrell Williams for someone smiling...

        No additional text, comments, or explanation. Just the song and artist.
        Like this format "Gagnam Style - PSY".

        So, what song does this image make you think of?
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: [{ type: "text", text: prompt }] },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` },
              },
            ],
          },
        ],
      });

      // console.log(
      //   `🔎 Tokens utilisés :`,
      //   completion.usage?.total_tokens || "Indisponible"
      // );

      const songSuggestion = completion.choices[0].message.content.trim();
      const [title, artist] = songSuggestion.split(" - ");

      const spotifyData = await getSongDetails(title.trim(), artist.trim());

      if (!spotifyData) {
        Alert.alert(
          "Erreur",
          "Impossible de trouver cette musique sur Spotify."
        );
        return;
      }

      setSongInfo(spotifyData);
      setModalVisible(true);
    } catch (error) {
      console.error("Error sending image to OpenAI:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'analyse de l'image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleThemeSong}>
        <Text style={styles.text}>Analyse</Text>
      </TouchableOpacity>

      {/* Modale affichant les infos de la musique */}
      <MusicModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        songInfo={songInfo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
