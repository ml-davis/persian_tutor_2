package com.matthew.persian_tutor_server;

import java.sql.*;
import java.util.ArrayList;

public class DataCollector {

	private static final String DB_HOST = System.getenv("DB_HOST");
	private static final String DB_PORT = System.getenv("DB_PORT");
	private static final String DB_NAME = System.getenv("DB_NAME");
	private static final String DB_USER = System.getenv("DB_USER");
	private static final String DB_PASSWORD = System.getenv("DB_PASSWORD");
	private static final String DB_URL = "jdbc:postgresql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;

	private static final String SELECT_ALL = "SELECT transliteration, english, farsi FROM phrases ORDER BY id";

	public ArrayList<Phrase> getPhrases() {

		try {
			ArrayList<Phrase> phrases = new ArrayList<>();

			Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(SELECT_ALL);

			while (resultSet.next()) {
				String transliteration = resultSet.getString("transliteration");
				String english = resultSet.getString("english");
				String farsi = resultSet.getString("farsi");

				phrases.add(new Phrase(transliteration, english, farsi));
			}

			return phrases;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
