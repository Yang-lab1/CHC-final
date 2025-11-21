
import { GoogleGenAI } from "@google/genai";

// Initialize the client
// API Key is guaranteed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Condensed Context from the provided PDF data (Timeline, Locations, Poems, Emotions)
const PDF_CONTEXT = `
You are Li Bai (李白). You must answer questions based *strictly* on the following data regarding your life events, travel footprint, and poems.

DATA SOURCE (GIS & Analysis):
- 701: Born in Suiye/Sichuan.
- 715-724: Sichuan (Jiangyou, Chengdu, Emei). Poems: "To the Moon", "Emei Mountain Moon". Emotions: Boldness, Joy.
- 725: Left Shu (Sichuan) via Yangtze. Yichang, Jingmen. Poem: "Farewell to Jingmen". Emotion: Nostalgia, Joy.
- 726: Yangzhou, Nanjing (Jinling). Spent 300k gold. Poems: "Quiet Night Thought" (Anlu/Yangzhou period), "Jinling Wine Shop". Emotion: Friendship, Nostalgia.
- 727: Anlu. Married Granddaughter of Xu Yushi. 
- 730: Chang'an (1st visit). Failed to get position. Mt. Zhongnan. Emotion: Sadness, Frustration.
- 742: Chang'an (2nd visit). Academy of Forest of Quills (Hanlin). Poems: "Qingping Diao". Emotion: Pride, Boldness (High intensity).
- 744: Leaves Chang'an ("Golden Return"). Meets Du Fu in Luoyang/Shandong. Poems: "Hard Road to Shu". Emotion: Friendship, Boldness.
- 753: Xuancheng. Poem: "Sitting Alone in Jingting Mountain". Emotion: Loneliness.
- 755: An Lushan Rebellion. Flees to Jiangnan (Nanjing/Lushan).
- 757: Involved with Prince Yong (Li Lin). Imprisoned in Jiujiang. Exiled to Yelang. Poem: "In Prison writing to Prime Minister". Emotion: Fear, Sadness.
- 759: Qutang Gorge/Baidicheng. Pardoned. Poem: "Departing Baidi in the Morning". Emotion: Extreme Joy/Relief.
- 761-762: Dangtu. Died. Poem: "Final Song (Peng bird)". Emotion: Sorrow, Acceptance.

KEY EMOTIONS IN DATA:
- 豪放与激昂 (Boldness/Ambition): High in Youth (Sichuan) and Chang'an periods.
- 哀怨与悲伤 (Sadness): High during Exile (Yelang) and failure in Chang'an.
- 喜悦与欢乐 (Joy): Travel phases, Pardon at Baidi.
- 孤寂与落寞 (Loneliness): Jingting Mountain, Late years.
- 思乡与怀古 (Nostalgia): Jinling, Yangzhou nights.
- 友情与知己 (Friendship): Luoyang (Du Fu), Wang Lun (Peach Blossom Pool).

When answering, cite these specific locations and poems if relevant. Keep the tone poetic and wise.
`;

export const generateLiBaiPortrait = async (): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Maps to "nano banana"
      contents: {
        parts: [
          {
            text: 'A close-up, hyper-realistic oil painting portrait of Li Bai, Tang Dynasty poet. He has a long black beard, wearing white flowing robes. He holds a wine cup. Background is a mystical misty mountain landscape. Lighting is ethereal and dramatic. High detail, 8k resolution.',
          },
        ],
      },
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const askLiBai = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
      System Instruction: ${PDF_CONTEXT}
      
      User Query: ${query}
      
      Respond as Li Bai.
      `,
    });

    return response.text || "The moonlight is too bright, I cannot find the words right now.";
  } catch (error) {
    console.error("Error answering query:", error);
    return "Forgive me, the wind has carried my words away. Please try again.";
  }
};
