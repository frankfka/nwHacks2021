from google.cloud import texttospeech
from proto import ProtoType


class TextToSpeechService:

    client: texttospeech.TextToSpeechClient

    def __init__(self):
        self.client = texttospeech.TextToSpeechClient()

    def convert_to_voice(self, input_text: str) -> ProtoType.BYTES:

        input_text = texttospeech.SynthesisInput(text=input_text)

        # Note: the voice can also be specified by name.
        # Names of voices can be retrieved with client.list_voices().
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Wavenet-G",
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = self.client.synthesize_speech(
            request={"input": input_text, "voice": voice, "audio_config": audio_config}
        )

        return response.audio_content


if __name__ == '__main__':
    svc = TextToSpeechService()

    convert_result = svc.convert_to_voice('This is some test input text')

    # The response's audio_content is binary.
    with open("output.mp3", "wb") as out:
        out.write(convert_result)
        print('Audio content written to file "output.mp3"')
