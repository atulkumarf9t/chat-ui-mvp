import ChatBot from "react-chatbotify";

export const Chat = ({ headerHeight }: { headerHeight: number }) => {
  async function postQuery(query: string) {
    try {
      const response = await fetch(
        "https://ca40-27-100-12-109.ngrok-free.app/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            top_k: 3,
            conversation_id: "string",
          }),
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return `${error}! Oh no I don't know what to say!`;
    }
  }
  const flow = {
    start: {
      message: "Hey there! How can I assist you today!",
      path: "loop",
    },
    loop: {
      message: async ({ userInput }: { userInput: string }) => {
        const result = await postQuery(userInput);
        return result.answer ?? result;
      },
      path: "loop",
    },
  };

  return (
    <ChatBot
      styles={{
        chatWindowStyle: {
          width: "100%",
          height: `calc(100dvh - ${headerHeight}px)`,
        },
      }}
      settings={{
        general: {
          embedded: true,
          primaryColor: "#009688",
          secondaryColor: "#26a69a",
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
          showFooter: false,
          showHeader: false,
        },
        chatHistory: { storageKey: "cognify-ev-chat-assisstant" },
      }}
      flow={flow}
    />
  );
};
