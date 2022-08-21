set SPECS_DIR='/Users/lee/projects/tao1/TTS/host_specs'
set RESULTS_DIR='/Users/lee/projects/tao1/TTS/host_results'
set DATA_DIR='/Users/lee/projects/tao1/TTS/host_data'
tao spectro_gen dataset_convert \
    -e $SPECS_DIR/spectro_gen/dataset_convert_ljs.yaml \
    -r $RESULTS_DIR/spectro_gen/dataset_convert \
    data_dir=$DATA_DIR/ljspeech \
    dataset_name=ljspeech