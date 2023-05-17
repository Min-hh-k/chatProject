export default function setCurrentChannel(channel) {
  return {
    type: "setCurrentChannel",
    payload: channel,
  };
}