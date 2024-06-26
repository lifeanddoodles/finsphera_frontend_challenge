import Text from "@/components/Text";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <Text role="status" className="sr-only">
          Loading...
        </Text>
      </div>
    </div>
  );
};

export default Loading;
