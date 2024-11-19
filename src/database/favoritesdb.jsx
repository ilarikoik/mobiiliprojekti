import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

const db = SQLite.openDatabaseSync("favorites.db");

export const initializeFavorites = async () => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT,
            img TEXT,
            date DATE,
            favorite BOOLEAN,
            movieId INTEGER,
            grade REAL DEFAULT 0.0)`); // real toimii floattina
  } catch (error) {
    console.log("Error favorites database " + error);
  }
};

export const saveItemFavorites = async (
  title,
  img,
  date,
  favorite,
  movieId,
  grade
) => {
  try {
    const checkDupli = await db.getAllAsync(
      `SELECT * FROM favorites WHERE movieId = ?`,
      [movieId]
    );
    if (!checkDupli.length) {
      await db.runAsync(
        `INSERT INTO favorites (title,img,date,favorite,movieId,grade) VALUES (?,?,?,?,?,?)`,
        [title, img, date, favorite, movieId, grade]
      );
    } else {
      //Alert.alert("Elokuva on jo suosikeissa");
    }
  } catch (error) {
    console.log("error saving into favorites " + error);
  }
};

export const getAllFavorites = async () => {
  try {
    const items = await db.getAllAsync(
      `SELECT * FROM favorites ORDER BY grade DESC;
`
    );
    return items;
  } catch (error) {
    console.log("error getching favorites: " + error);
  }
};

export const deleteItemFavorite = async (id) => {
  try {
    await db.runAsync("DELETE FROM favorites WHERE id=?", [id]);
    console.log(`Item with ID ${id} deleted successfully from favorites`);
  } catch (error) {
    console.error("Could not delete item", error);
  }
};
