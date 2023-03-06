export const generateCanvas = ({ width, height, attachNode }) => {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");

  element.style.width = width + "px";
  element.style.height = height + "px";

  const scale = window.devicePixelRatio;
  element.width = Math.floor(width * scale);
  element.height = Math.floor(height * scale);
  context.scale(scale, scale);

  document.querySelector(attachNode).appendChild(element);

  return [context, width, height, element];
};

export const randomBool = (probability = 0.5) => Math.random() >= probability;

export const makeAudioManager = () => {
  const audioCTX = new AudioContext();
  const piece1FileBuffer = _loadFile(audioCTX, "./assets/sfx/piece1.wav");
  const piece2FileBuffer = _loadFile(audioCTX, "./assets/sfx/piece2.wav");

  async function _loadFile(context, filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async function _playTrack(audioBuffer, loop = true) {
    return Promise.all([audioBuffer, audioCTX.resume()]).then((e) => {
      const trackSource = new AudioBufferSourceNode(audioCTX, {
        buffer: e[0],
        loop: loop,
      });
      trackSource.connect(audioCTX.destination);
      trackSource.start();

      return trackSource;
    });
  }

  const playPiece = () => {
    _playTrack(randomBool() ? piece1FileBuffer : piece2FileBuffer, false);
  };

  return {
    playPiece
  };
};