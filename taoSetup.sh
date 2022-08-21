# download spec files for FastPitch
! tao spectro_gen download_specs \
    -r $RESULTS_DIR/spectro_gen \
    -o $SPECS_DIR/spectro_gen

# download spec files for HiFiGAN
! tao vocoder download_specs \
    -r $RESULTS_DIR/vocoder \
    -o $SPECS_DIR/vocoder

# get dataset
! wget -O $HOST_DATA_DIR/ljspeech.tar.bz2 https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2

! tar -xvf $HOST_DATA_DIR/ljspeech.tar.bz2
! rm -rf $HOST_DATA_DIR/ljspeech
! mv LJSpeech-1.1 $HOST_DATA_DIR/ljspeech

# to build my own dataset, follow the LJSpeech format

# Training

## FastPitch

### _Recall that FastPitch is a type of thing that creates mel_spectrographs. We might use any tool for creating a mel spectrograph._ 

### Prior is needed for FastPitch training. If an empty folder is provided, prior will generate on-the-fly.
! mkdir -p $RESULTS_DIR/spectro_gen/train/prior_folder

!tao spectro_gen train \
     -e $SPECS_DIR/spectro_gen/train.yaml \
     -g 1 \
     -k $KEY \
     -r $RESULTS_DIR/spectro_gen/train \
     train_dataset=$DATA_DIR/ljspeech/ljspeech_train.json \
     validation_dataset=$DATA_DIR/ljspeech/ljspeech_val.json \
     prior_folder=$RESULTS_DIR/spectro_gen/train/prior_folder \
     trainer.max_epochs=5

## Hifi-GAN

### _Recall that Hifi-GAN is a vocoder. We might use any vocoder._
!tao vocoder train \
     -e $SPECS_DIR/vocoder/train.yaml \
     -g 1 \
     -k $KEY \
     -r $RESULTS_DIR/vocoder/train \
     train_dataset=$DATA_DIR/ljspeech/ljspeech_train.json \
     validation_dataset=$DATA_DIR/ljspeech/ljspeech_val.json \
     trainer.max_steps=10000


# At this stage, we have a model
# Next, we can use the model to create audio sentences.
## _Do not expect audio at this stage to sound exactly like our input_
## _We will compare the output here to the originally recorded sentences. Then we will change training parameters and re-compare until we're satisfied._

# This is a two-step process. At a high level, the steps are:
# 1. Give text to the spectrograph generator (docs for our command)[https://docs.nvidia.com/tao/tao-toolkit/text/tts/spectrogram.html]
# 2. Give the generated spectrograph to the vocoder

# step 1
!tao spectro_gen infer_onnx \
     -e $SPECS_DIR/spectro_gen/infer.yaml \
     -g 1 \
     -k $KEY \
     -m $RESULTS_DIR/spectro_gen/export/spectro_gen.eonnx \
     -r $RESULTS_DIR/spectro_gen/infer_onnx \
     output_path=$RESULTS_DIR/spectro_gen/infer_onnx/spectro

# step 2
!tao vocoder infer_onnx \
     -e $SPECS_DIR/vocoder/infer.yaml \
     -g 1 \
     -k $KEY \
     -m $RESULTS_DIR/vocoder/export/vocoder.eonnx \
     -r $RESULTS_DIR/vocoder/infer_onnx \
     input_path=$RESULTS_DIR/spectro_gen/infer_onnx/spectro \
     output_path=$RESULTS_DIR/vocoder/infer_onnx/wav