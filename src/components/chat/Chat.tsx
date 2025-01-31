import ChatBot from "react-chatbotify";

export const Chat = () => {
  async function postQuery(query: string) {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          query: query,
        }),
      });
      const data = await response.json();
      return data.id;
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
        return `${result} : You have sent me - '${userInput}'`;
      },
      path: "loop",
    },
  };

  return (
    <div style={{ margin: "4% 0 0 0", overflow: "hidden" }}>
      <ChatBot
        styles={{
          chatWindowStyle: {
            width: "100%",
          },
        }}
        settings={{
          general: {
            embedded: true,
            primaryColor: "#009688",
            secondaryColor: "#26a69a",
            fontFamily:
              "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            showFooter: false,
            showHeader: false,
          },
          chatHistory: { storageKey: "cognify-ev-chat-assisstant" },
        }}
        flow={flow}
      />
    </div>
  );
};
