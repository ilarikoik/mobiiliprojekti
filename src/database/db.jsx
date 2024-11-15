// dbHelper.js
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

const db = SQLite.openDatabaseSync("watchlist.db");
export const initialize = async () => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        img TEXT,
        date DATE,
        katselulista BOOLEAN,
        movieId INTEGER
      );`);
  } catch (error) {
    console.error("Could not open database", error);
  }
};

export const saveItem = async (title, img, date, katselulista, movieId) => {
  try {
    const checkDuplicates = await db.getAllAsync(
      `SELECT * FROM watchlist WHERE movieId = ?`,
      [movieId]
      // ? on placeholderi ja arrayna koska jos annettais vaikka monta [movieId,title..] hyvä tapa
    );
    if (checkDuplicates.length) {
      Alert.alert("Elokuva on jo listalla");
    } else {
      await db.runAsync(
        "INSERT INTO watchlist (title, img, date, katselulista,movieId) VALUES (?, ?, ?, ?,?)",
        [title, img, date, katselulista, movieId]
      );
    }
  } catch (error) {
    console.error("Could not add item", error);
  }
};
export const deleteItem = async (id) => {
  try {
    await db.runAsync("DELETE FROM watchlist WHERE id=?", [id]);
    console.log(`Item with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Could not delete item", error);
  }
};

export const getAllItems = async () => {
  try {
    console.log("Fetching items from watchlist...");
    const result = await db.getAllAsync("SELECT * FROM watchlist");
    return result;
  } catch (error) {
    console.error("Could not retrieve items", error);
    return [];
  }
};
