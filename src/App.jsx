import Canciones from "../src/Canciones"; // Importa el array de canciones
import Albums from "../src/Covers"; // Importa el array de imágenes de álbumes
import Videos from "../src/Videos"; // Importa el array de videos
import "./index.css";
import { useRef, useState } from "react";

function App() {
  const [currentMusicDetails, setcurrentMusicDetails] = useState({
    Name: "Sorairo Days",
    Artist: "Shoko Nakagawa",
    Cancion: Canciones[0].Cancion,
    Album: Albums[0], // Usa la primera imagen por defecto
  });

  const [audioProgress, setaudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [MusicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [videoIndex, setvideoIndex] = useState(0);

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setaudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  let avatarClass = ["objetFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setavatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setavatarClassIndex(0);
    } else {
      setavatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleNextSong = () => {
    if (MusicIndex >= Canciones.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = MusicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (MusicIndex === 0) {
      let setNumber = Canciones.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = MusicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = Canciones[number];
    currentAudio.current.src = musicObject.Cancion;
    currentAudio.current.play();
    setcurrentMusicDetails({
      Name: musicObject.Name,
      Artist: musicObject.Artist,
      Cancion: musicObject.Cancion,
      Album: Albums[number], // Asigna la imagen correspondiente a la canción
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setaudioProgress(isNaN(progress) ? 0 : progress);
  };

  const VidArray = [Videos[0], Videos[1], Videos[2], Videos[3]];

  const handleChangeBackGround = () => {
    if (videoIndex > VidArray.length - 1) {
      setvideoIndex(0);
    } else {
      setvideoIndex(videoIndex + 1);
    }
  };

  return (
    <>
      <div className="Container">
        <audio
          src={currentMusicDetails.Cancion}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
          ref={currentAudio}
          autoPlay
        ></audio>
        <video
          src={VidArray[videoIndex]}
          autoPlay
          loop
          muted
          className="BackgroundVideo"
        ></video>
        <div className="BlackScreen"></div>
        <div className="Music-Container">
          <p className="MusicPlayer">Reproductor Musical</p>
          <p className="Music-Head-Name">{currentMusicDetails.Name}</p>
          <p className="Music-Artist">{currentMusicDetails.Artist}</p>
          <img
            className={avatarClass[avatarClassIndex]}
            src={currentMusicDetails.Album}
            draggable={false}
            id="songAvatar"
            onClick={handleAvatar}
          />
          <div className="MusicTimerDiv">
            <p className="MusicCurrentTime">{musicCurrentTime}</p>
            <p className="MusicTotalLenght">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="MusicProgressBar"
            className="MusicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="MusicControlers">
            <i
              className="fa-solid fa-backward MusicControler"
              onClick={handlePrevSong}
            ></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward MusicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>
        <div className="ChangeBackBtn" onClick={handleChangeBackGround}>
          Cambiar Fondo
        </div>
      </div>
    </>
  );
}

export default App;
