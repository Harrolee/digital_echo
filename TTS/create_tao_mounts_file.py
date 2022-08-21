# please define these paths on your local host machine
# import os

# os.environ["HOST_DATA_DIR"] = FIXME
# os.environ["HOST_SPECS_DIR"] = FIXME
# os.environ["HOST_RESULTS_DIR"] = FIXME

# ! mkdir -p $HOST_DATA_DIR
# ! mkdir -p $HOST_SPECS_DIR
# ! mkdir -p $HOST_RESULTS_DIR

# Mapping up the local directories to the TAO docker.
import json
import os

HOST_DATA_DIR = '/Users/lee/projects/tao1/TTS/host_data'
HOST_SPECS_DIR = '/Users/lee/projects/tao1/TTS/host_specs'
HOST_RESULTS_DIR = '/Users/lee/projects/tao1/TTS/host_specs'

mounts_file = os.path.expanduser("~/.tao_mounts.json")
tao_configs = {
   "Mounts":[
       {
           "source": HOST_DATA_DIR,
           "destination": "/data"
       },
       {
           "source": HOST_SPECS_DIR,
           "destination": "/specs"
       },
       {
           "source": HOST_RESULTS_DIR,
           "destination": "/results"
       },
       {
           "source": os.path.expanduser("~/.cache"),
           "destination": "/root/.cache"
       }
   ],
   "DockerOptions": {
        "shm_size": "16G",
        "ulimits": {
            "memlock": -1,
            "stack": 67108864
         }
   }
}
# Writing the mounts file.
with open(mounts_file, "w") as mfile:
    json.dump(tao_configs, mfile, indent=4)