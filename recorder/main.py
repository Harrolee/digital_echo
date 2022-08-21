# import sounddevice as sd
# from scipy.io.wavfile import write
from pynput.keyboard import Listener, Key
from document_feeder import DocumentFeeder
# from record import Recorder

def main():
    # get 

    app = App()

"""
app needs:
    queue of sentences to display
    session state: 
        When the user stops their session, the app should save the updated queue to a file
        When the app starts, it should read from a file and use that queue to display sentences

app:
    display sentence
    when space is pressed, record
    when esc is pressed, stop recording
        save recording to file
        add entry to json
            {files:[{"name_of_file":"text in the file"}]}

user experience:
    words appear on screen
    
    user presses spacebar
    user speaks
    user presses escape key 

    new words appear on screen
"""

class App: 
    
    def __init__(self):
        #self.recorder = Recorder()
        self.listener = Listener(on_press=self.on_press, on_release=self.on_release)
        self.listener.start()
        self.listening = True
        print('star listener')
        while self.listening:
            pass

    def on_press(self, key):
        """
        Begin recording when user presses spacebar.
        """
        if key == Key.space:
            print('pressed spacebar')
            #self.recorder.start()
        elif key == Key.shift:
            print('stopping recording, save file, and queue next event')
            #self.listener.join() what does this do?
        elif key == Key.esc:
            self.listener.stop()
            self.listening = False

    def on_release(self, key):
        """
        Stop recording when user releases spacebar.
        """
        if key == Key.space:
            print('released spacebar')
            #self.recorder.stop()
        

# stop recording when user presses 'esc'

# save recording to file

# add filename of recording to json file

def convert_txt_to_list():
    """
    Convert txt file to list.
    Remove list elements with only one string.
    """
    with open('data/section.txt', 'r') as f:
        data = f.readlines()
    data = [x for x in data if len(x.split()) > 1]
    return data

if '__main__' == __name__:
    feeder = DocumentFeeder("../data/section.txt")
    for line in feeder.feed():
        if line == False:
            break
        print(line)
    #main()


# state : {
#     : 
# }