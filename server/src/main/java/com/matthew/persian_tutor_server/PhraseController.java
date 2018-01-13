package com.matthew.persian_tutor_server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PhraseController {

	private static final DataCollector collector = new DataCollector();
	private Phrases phrases;

	public PhraseController() {
		this.phrases = new Phrases(collector.getPhrases());
	}

	@CrossOrigin
	@RequestMapping("/phrases")
	public Phrases getPhrase() {
		return this.phrases;
	}
}
