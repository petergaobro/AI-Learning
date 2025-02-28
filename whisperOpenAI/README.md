# Whisper

[[Blog]](https://openai.com/blog/whisper)
[[Paper]](https://arxiv.org/abs/2212.04356)
[[Model card]](https://github.com/openai/whisper/blob/main/model-card.md)
[[Colab example]](https://colab.research.google.com/github/openai/whisper/blob/master/notebooks/LibriSpeech.ipynb)

Whisper is a versatile speech recognition model that has been trained on a vast range of diverse audio data. It is capable of handling multiple tasks, including speech recognition in various languages, speech translation, and language identification.

## Approach

![Approach](https://raw.githubusercontent.com/openai/whisper/main/approach.png)

A Transformer sequence-to-sequence model is trained on multiple speech processing tasks, such as multilingual speech recognition, speech translation, spoken language identification, and voice activity detection. These tasks are represented together as a sequence of tokens that the decoder must predict, enabling a single model to replace many stages of a traditional speech-processing pipeline. The multitask training approach uses special tokens to indicate different tasks or classification targets.


## Setup

We used Python 3.9.9 and PyTorch 1.10.1 to train and test our models, but the codebase should also be compatible with Python versions 3.8-3.11 and recent PyTorch versions. The codebase relies on several Python packages, including OpenAI's tiktoken for its fast tokenizer implementation. You can install or update to the latest version of Whisper by running the following command:

    pip install -U openai-whisper

Alternatively, you can install the latest commit from this repository and its Python dependencies with:

nginx

pip install git+https://github.com/openai/whisper.git


To update the package to the latest version from this repository, run:

    pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git


## Python usage

Transcription can also be performed within Python: 

```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("audio.mp3")
print(result["text"])
```

Internally, the `transcribe()` method reads the entire file and processes the audio with a sliding 30-second window, performing autoregressive sequence-to-sequence predictions on each window.

Below is an example usage of `whisper.detect_language()` and `whisper.decode()` which provide lower-level access to the model.

```python
import whisper

model = whisper.load_model("base")

# load audio and pad/trim it to fit 30 seconds
audio = whisper.load_audio("audio.mp3")
audio = whisper.pad_or_trim(audio)

# make log-Mel spectrogram and move to the same device as the model
mel = whisper.log_mel_spectrogram(audio).to(model.device)

# detect the spoken language
_, probs = model.detect_language(mel)
print(f"Detected language: {max(probs, key=probs.get)}")

# decode the audio
options = whisper.DecodingOptions()
result = whisper.decode(model, mel, options)

# print the recognized text
print(result.text)
```

## More examples

Please use the [🙌 Show and tell](https://github.com/openai/whisper/discussions/categories/show-and-tell) category in Discussions for sharing more example usages of Whisper and third-party extensions such as web demos, integrations with other tools, ports for different platforms, etc.


## License

Whisper's code and model weights are released under the MIT License. See [LICENSE](https://github.com/openai/whisper/blob/main/LICENSE) for further details.
