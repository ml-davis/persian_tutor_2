package com.matthew.persian_tutor_server;

public class Phrase {

	private final String transliteration;
	private final String english;
	private final String farsi;

	public Phrase(String transliteration, String english, String farsi) {
		this.transliteration = transliteration;
		this.english = english;
		this.farsi = farsi;
	}

	public String getEnglish() {
		return english;
	}

	public String getTransliteration() {
		return transliteration;
	}

	public String getFarsi() {
		return farsi;
	}
}
