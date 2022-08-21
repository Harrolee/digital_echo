# Dataset creation:

Build a tool that shows text to read. User presses spacebar to begin recording. User reads line. User presses spacebar to stop recording.

The tool generates two things:

1. .wav file of recording
1. json entry that maps the name of the .wav file to the text in the audio

The result should be a single json that maps read text to recordings.

### Need a tool to convert long text file (like a book) to a programmable object of sentences.

    Before this, I need a .txt to convert.
        google got me to (this ycombinator post)[https://news.ycombinator.com/item?id=24884789]
    Aaron Swartz - https://github.com/shawwn/scrap/blob/master/epub2txt-all

    #### Shawwn Presser is a legend.
        Here is a twitter thread about his release of books3: https://twitter.com/theshawwn/status/1320282149329784833

        Here is a script to mount books from books3 remotely: (shawwn/mount)[https://github.com/shawwn/mount]. A good exercise and contribution to OSS community would be learn why it only runs as root.

    #### These technologies were used by Shawwn Presser to build mount^^
    (simple-httpfs:)[https://github.com/higlass/simple-httpfs] read books as though they were on the local filesystem
    (ratarmount)[https://github.com/mxmlnkn/ratarmount] is a way to read from any file in a tarball without having to extract the tarball

Current state:
You have some .txt files. Write a script to convert its chapters into json objects, each containing a list of every sentence in the chapter.
--> from this, you can make the gui for recording audio
