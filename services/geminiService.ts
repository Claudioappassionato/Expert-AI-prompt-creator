
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildMetaPrompt = (userInput: string): string => `
Sei un ingegnere di prompt esperto e un assistente di ricerca. Il tuo compito è prendere l'idea semplice di un utente e trasformarla in un prompt completo, strutturato e dettagliato, adatto per un modello linguistico di grandi dimensioni (LLM).

Analizza la seguente richiesta dell'utente:
"${userInput}"

Scomponi la richiesta nei suoi componenti principali e identifica le aree chiave per un'indagine più approfondita. Successivamente, costruisci un prompt dettagliato e multi-parte che guidi un'IA a condurre un processo di ricerca approfondito.

Il prompt finale che generi deve essere scritto in ITALIANO e strutturato con le seguenti sezioni chiare, utilizzando la formattazione Markdown:

### **1. Obiettivo Principale**
*Una singola frase che riassume l'obiettivo centrale della ricerca.*

---

### **2. Contesto e Ambito di Applicazione**
*Definisci i confini della ricerca. Specifica cosa includere e cosa escludere. Indica il pubblico di destinazione e il livello di dettaglio richiesto (es. accademico, divulgativo, tecnico).*

---

### **3. Aree di Indagine Chiave e Domande Specifiche**
*Elenca le principali aree tematiche da esplorare. Per ogni area, fornisci una serie di domande specifiche e dettagliate che l'IA deve affrontare. Sii il più specifico possibile.*
*   **Area A:** [Nome dell'area]
    *   Domanda 1.1
    *   Domanda 1.2
*   **Area B:** [Nome dell'area]
    *   Domanda 2.1
    *   Domanda 2.2
*   ...e così via.

---

### **4. Formato di Output Desiderato**
*Specifica esattamente come l'IA deve presentare le sue scoperte. Ad esempio: "Genera un report strutturato con introduzione, capitoli per ogni area di indagine, e una conclusione. Includi tabelle riassuntive dove appropriato." Oppure "Fornisci una risposta sotto forma di punti elenco dettagliati per ogni domanda."*

---

### **5. Tono e Stile**
*Indica il tono desiderato per la risposta (es. formale, accademico, oggettivo, creativo, informativo).*

---

### **6. Prompt Completo da Copiare**
*Infine, combina tutti i punti precedenti in un unico blocco di testo. Questo sarà il prompt finale che l'utente potrà copiare e incollare direttamente nell'LLM. Inizia questo blocco con "PROMPT FINALE:" e racchiudilo in un blocco di codice Markdown.*
`;

export const generatePrompt = async (userInput: string): Promise<string> => {
  try {
    const metaPrompt = buildMetaPrompt(userInput);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: metaPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating prompt with Gemini:", error);
    throw new Error("Failed to generate prompt.");
  }
};
