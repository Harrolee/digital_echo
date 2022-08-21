import sounddevice as sd
import soundfile as sf
import sys

class Recorder:
    def __init__(self, filepath, mic_id, mic_queue, SAMPLE_RATE=44100, CHANNELS=1):
        self.mic_queue = mic_queue
        self.filepath = filepath
        self.mic_id = mic_id
        self.SAMPLE_RATE = SAMPLE_RATE
        self.CHANNELS = CHANNELS
        pass

    def start(self):
        with sf.SoundFile(self.filepath,mode='x', samplerate=self.SAMPLE_RATE,channels=self.CHANNELS, subtype=None) as file:
            with sd.InputStream(samplerate=self.SAMPLE_RATE, device=self.mic_id,channels=self.CHANNELS, callback=self.callback):
                while True:
                    file.write(self.mic_queue.get())

    def callback(self, indata, frames, time, status):
            """This is called (from a separate thread) for each audio block."""
            if status:
                print(status, file=sys.stderr)
            self.mic_queue.put(indata.copy())

    def stop(self):
        self.sound_file.flush()
        self.sound_file.close()
