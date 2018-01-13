package com.matthew.persian_tutor_server;

import java.util.ArrayList;

public class Phrases {
	private final ArrayList<Phrase> phrases;

	public Phrases(ArrayList<Phrase> phrases) {
		this.phrases = phrases;
	}

	public ArrayList<Phrase> getPhrases() {
		return phrases;
	}
}
