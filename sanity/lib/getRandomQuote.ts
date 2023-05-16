import { client } from "./client";

export async function getRandomQuote() {
    try {
      const query = '*[_type == "quote"]';
      const quotes = await client.fetch(query);
  
      if (!quotes.length) {
        throw new Error("No quotes found");
      }
  
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    } catch (error) {
      console.error("Error fetching quote:", error);
      return {
        //default quote in case of error
        quoteText: "On ne change jamais les choses en combattant la réalité existante. Pour changer quelque chose, construisez un nouveau modèle qui rendra inutile l’ancien.",
        quoteAuthor: "Richard Buckminster Fuller",
      };
    }
  }
  