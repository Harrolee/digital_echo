## What format?

Follow LJSpeech format

```
! wget -O $HOST_DATA_DIR/ljspeech.tar.bz2 https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2

! tar -xvf $HOST_DATA_DIR/ljspeech.tar.bz2
! rm -rf $HOST_DATA_DIR/ljspeech
! mv LJSpeech-1.1 $HOST_DATA_DIR/ljspeech
```

## Pre-Processing?

_Split the dataset into 3 parts: training, validation, and test._

Generate these three files:

1. ljs_audio_text_train_filelist.txt
1. ljs_audio_text_val_filelist.txt
1. ljs_audio_text_test_filelist.txt

Rows in these files should follow this format:
`DUMMY/<file_name>.wav|<text_of_the_audio>`

_Example Row:_
`DUMMY/LJ045-0096.wav|Mrs. De Mohrenschildt thought that Oswald`

[details](https://docs.nvidia.com/deeplearning/riva/user-guide/docs/tutorials/tts-python-advanced-pretrain-tts-tao-training.html#pre-processing)
